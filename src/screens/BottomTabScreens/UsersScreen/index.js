import React, {useEffect, useState, useContext, useRef} from 'react';
import {Text, View, FlatList, TouchableOpacity, Animated} from 'react-native';

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

// constants
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
  const {isDarkMode} = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;

  const rotationValue = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);

  // Use State
  const [users, setUsers] = useState([]);
  const [showIcons, setShowIcons] = useState(false);

  // Selectors
  const store = useSelector(state => state.users.userData);

  // Fucntions
  const rotateInterpolate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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

  // console.log('dsfs', users);
  const handleAddNewUserClick = () => {
    setIsPressed(!isPressed);

    console.log('ahsdgk');
    setShowIcons(!showIcons);

    Animated.timing(rotationValue, {
      toValue: isPressed ? 0 : 1,
      duration: 1000,
      useNativeDriver: false, // Add this line for compatibility
    }).start();
  };

  const getRandomLightMatteColor = () => {
    const getRandomComponent = () => Math.floor(Math.random() * 290);
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
    return `rgb(${r}, ${g}, ${b})`;
  };

  // navigation
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
        <Text style={styles.title}>PikUp</Text>
      </View>
    );
  };

  renderBody = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={[styles.chatList]}
          onPress={() => handleUserClick(item)}>
          <View>
            {/* <Image source={Avatar} style={[styles.avatar]} alt='avatar' /> */}
            {/* <View style={[styles.avatar,{backgroundColor:getRandomLightMatteColor()}]}> */}
            <LinearGradient
              colors={['#fefefe', getRandomLightMatteColor()]}
              style={[
                styles.avatar,
                {backgroundColor: getRandomLightMatteColor()},
              ]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: 'black',
                  },
                ]}>
                {item.name.slice(0, 1)}
              </Text>
            </LinearGradient>
            {/* </View> */}
          </View>
          <Spacer width={widthPercentageToDP('2%')} />
          <View>
            <Text
              style={[
                styles.text,
                {
                  color: fontTheme,
                },
              ]}>
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
      ]}>
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={renderBody}
        ListHeaderComponent={renderHeader()}
      />
      <View style={styles.iconsContainer}>
        {showIcons ? (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={() => console.log('Edit')}>
              <Icon
                name="user"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={() => console.log('User Profile')}>
              <Icon
                name="user-plus"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />
            <TouchableOpacity style={styles.addNewUser} onPress={goToProfile}>
              <Icon
                name="gear"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />
          </View>
        ) : null}
        <TouchableOpacity
          style={[styles.addNewUser]}
          onPress={handleAddNewUserClick}
          activeOpacity={0.7}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Icon
          name="pencil"
          size={20}
          color={theme.fontColors.black}
          style={styles.icon}
        />
      </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;

// const filteredUsers = users
//   ? users.filter(user => user.email !== store[0].email)
//   : [];
// console.log('filteredUsers', filteredUsers);
