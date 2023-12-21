import React, {useEffect, useState, useContext} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

// Redux
import {useSelector} from 'react-redux';

// constants
import Avatar from '../../../assets/Imags/avatar.webp';
import theme from '../../../constants/theme';
import {ThemeContext} from '../../../utils/themeContext';

// Styles
import {styles} from './styles';

const UserScreen = () => {
  // Variables
  const navigation = useNavigation();
  const isDarkMode = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;

  // Use State
  const [users, setUsers] = useState([]);

  // Selectors
  const store = useSelector(state => state.users.userData);

  // Fucntions
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
    navigation.navigate('ChatScreen', {data: item, id: store[0].userID});
  };

  console.log('dsfs', users);
  const handleAddNewUserClick = () => {};

  const getRandomLightMatteColor = () => {
    const getRandomComponent = () => Math.floor(Math.random() * 290);
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
    return `rgb(${r}, ${g}, ${b})`;
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
        renderItem={({item}) => (
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
                      color: isDarkMode
                        ? theme.fontColors.white
                        : theme.fontColors.black,
                    },
                  ]}>
                  {item.name.slice(0, 1)}
                </Text>
              </LinearGradient>
              {/* </View> */}
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color: isDarkMode
                      ? theme.fontColors.white
                      : theme.fontColors.black,
                  },
                ]}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.addNewUser]}
        onPress={handleAddNewUserClick}
        activeOpacity={0.7}>
        <Icon
          name="user-plus"
          size={20}
          color={isDarkMode ? theme.fontColors.white : theme.fontColors.black}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;

// const filteredUsers = users
//   ? users.filter(user => user.email !== store[0].email)
//   : [];
// console.log('filteredUsers', filteredUsers);
