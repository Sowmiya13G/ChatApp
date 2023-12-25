import React, { useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList, TouchableOpacity, Animated, Image, Easing } from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

// Redux
import { useSelector } from 'react-redux';

// Constants
import Avatar from '../../../assets/Imags/avatar.webp';
import theme from '../../../constants/theme';
import { ThemeContext } from '../../../utils/themeContext';

// Components
import Spacer from '../../../components/Spacer';

// Styles
import { styles } from './styles';

const UserScreen = () => {
  // Variables
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;

  // Use State
  const [users, setUsers] = useState([]);
  const [showIcons, setShowIcons] = useState(false);

  // Redux Selector
  const store = useSelector(state => state.users.userData);

  // Fade-in and Fade-out Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to handle fade-in animation
  const fadeInAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      easing: Easing.ease, // Optional easing function, you can customize it
      useNativeDriver: true,
    }).start(()=>{

    });
  };

  // Function to handle fade-out animation
  const fadeOutAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setShowIcons(false);
      fadeAnim.setValue(0); // Reset the fadeAnim value
    });
  };
  
  useEffect(() => {
    if (showIcons) {
      fadeInAnimation();
    } else {
      fadeOutAnimation();
    }
  }, [showIcons]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const email = store[0].email;
      const tempData = [];

      firestore()
        .collection('users')
        .where('email', '!=', email)
        .get()
        .then(resp => {
          resp.docs.forEach(doc => {
            tempData.push(doc.data());
          });
          setUsers(tempData);
        });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = item => {
    navigation.navigate('ChatScreen', { data: item, id: store[0].userID });
  };

  const handleAddNewUserClick = () => {
    if (showIcons) {
     fadeOutAnimation()
    } else {
      setShowIcons(true)
    }
  };

  const getRandomLightMatteColor = () => {
    const getRandomComponent = () => Math.floor(Math.random() * 290);
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Navigation
  const goToProfile = () => {
    navigation.navigate('SettingsScreen');
  };

  // Render UI.......

  // Render header
  renderHeader = () => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode
              ? theme.backgroundColor.dark
              : theme.backgroundColor.themeBG,
          },
        ]}>
        {/* <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
          <Icon name="angle-left" size={30} color={theme.fontColors.black} />
        </TouchableOpacity> */}
        <Text style={[
          styles.title,
          {
            color: isDarkMode
              ? theme.fontColors.white
              : theme.fontColors.black,
          }
        ]}>PikUp</Text>
      </View>
    );
  };

  renderBody = ({ item }) => {
    console.log('ITEM', item?.profileImage)
    return (
      <View>
        <TouchableOpacity
          style={[styles.chatList]}
          onPress={() => handleUserClick(item)}
        >
          <View>
            {item.profileImage != null ? (
              <Image
                source={{ uri: item?.profileImage }}
                style={[styles.avatar]}
                alt="avatar"
              />
            ) : (
              <LinearGradient
                colors={['#fefefe', getRandomLightMatteColor()]}
                style={[
                  styles.avatar,
                  { backgroundColor: getRandomLightMatteColor() },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color: isDarkMode
                        ? theme.fontColors.white
                        : theme.fontColors.black,
                    },
                  ]}
                >
                  {item.name.slice(0, 1)}
                </Text>
              </LinearGradient>
            )}
          </View>
          <Spacer width={widthPercentageToDP('2%')} />
          <View>
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? theme.backgroundColor.dark
            : theme.backgroundColor.themeBG,
        },
      ]}
    >
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={renderBody}
        ListHeaderComponent={renderHeader()}
      />

      <Animated.View
        style={[
          styles.iconsContainer,
          // { opacity: fadeAnim, transform: [{ translateY: fadeAnim }] },
        ]}
      >
        {showIcons ? (
           <Animated.View
           style={[
             styles.iconContainer,
             { opacity: fadeAnim, transform: [{ translateY: fadeAnim }] },
           ]}
         >
            {/* First Icon */}
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={() => console.log('Edit')}
            >
              <Icon
                name="user"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />

            {/* Second Icon */}
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={() => console.log('User Profile')}
            >
              <Icon
                name="user-plus"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />

            {/* Third Icon */}
            <TouchableOpacity style={styles.addNewUser} onPress={goToProfile}>
              <Icon
                name="gear"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />
            </Animated.View>
        ) : null}

        {/* Animated Pencil Icon */}
        <TouchableOpacity
          style={[styles.addNewUser]}
          onPress={handleAddNewUserClick}
          activeOpacity={0.7}
        >
          <Icon
            name="pencil"
            size={20}
            color={theme.fontColors.black}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default UserScreen;
