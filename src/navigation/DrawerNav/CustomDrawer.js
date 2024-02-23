import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Text, Switch, Image } from 'react-native';

// Packages
import { useNavigation } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {
  getStorage,
  ref,
  uploadFile,
  getDownloadURL,
  uploadBytes,
} from '@react-native-firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage } from '../../../redux/features/userSlice';
import { setUserData } from '../../redux/features/userSlice';

// Constants
import Spacer from '../../components/Spacer';
import { color } from '../../constants/theme';
import { ThemeContext } from '../../utils/themeContext';

// styles
import { styles } from './styles';

const CustomDrawer = props => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // State
  const [currentUser, setCurrentUser] = useState(null);
  console.log('currentUser', currentUser);
  // Selectors
  const store = useSelector(state => state.users.userData);
  const userId = store[0].userID;
  console.log('store', store);
  // Functions
  const fetchCurrentUser = useCallback(async () => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        setCurrentUser(userDoc.data());
        console;
      } else {
        console.log('User document not found');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }, [store]);

  const cancelNav = () => {
    navigation.navigate('HomeTab');
  };
  const handleLogout = () => {
    // console.log('logged out successfully');
    // try {
    //   await auth().signOut();
    //   dispatch(clearUserDataAction());
    // navigation.navigate('LoginScreen');
    // } catch (error) {
    //   console.error('Error during logout:', error);
    // }
    dispatch(setUserData([]));
    navigation.navigate('LoginScreen');
  };

  const profImg = currentUser?.profileImage
  // Use effect
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: isDarkMode
          ? color.dark
          : color.themeBG,
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.details}>
          <Image source={{uri:profImg}} style={styles.profileImg} />
          <Spacer height={hp('2%')} />
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? color.white
                    : color.black,
                },
              ]}>
              {currentUser && currentUser.name}
            </Text>
            <Spacer height={hp('1.5%')} />
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? color.white
                    : color.black,
                },
              ]}>
              {currentUser && currentUser.phoneNumber}
            </Text>
          </View>
          <TouchableOpacity onPress={cancelNav} style={styles.cancel}>
            <Icon
              name={'close'}
              size={20}
              color={
                isDarkMode ? color.white : color.black
              }
            />
          </TouchableOpacity>
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
        <TouchableOpacity style={styles.nightMode}>
          <Icon
            name={'moon-o'}
            size={25}
            color={isDarkMode ? color.white : color.black}
          />
          <Spacer width={widthPercentageToDP('2%')} />
          <Text
            style={[
              styles.logOutText,
              {
                color: isDarkMode
                  ? color.white
                  : color.black,
              },
            ]}>
            Night Mode
          </Text>
          <Spacer width={widthPercentageToDP('2%')} />
          <View style={styles.toggleContainer}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor={
                isDarkMode
                  ? color.white
                  : color.dark
              }
              trackColor={
                isDarkMode
                  ? color.white
                  : color.dark
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOut} onPress={() => handleLogout()}>
          <Icon
            name={'sign-out'}
            size={25}
            color={isDarkMode ? color.white : color.black}
          />
          <Text
            style={[
              styles.logOutText,
              {
                color: isDarkMode
                  ? color.white
                  : color.black,
              },
            ]}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
