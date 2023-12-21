import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, Switch} from 'react-native';

// Packages
import {useNavigation} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP} from 'react-native-responsive-screen';

// Constants
import Spacer from '../../components/Spacer';

// constants
import theme from '../../constants/theme';
import {ThemeContext} from '../../utils/themeContext';

// styles
import {styles} from './styles';

import {useDispatch} from 'react-redux';
const CustomDrawer = props => {
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cancelNav = () => {
    navigation.navigate('HomeTab');
  };
  //   const handleLogout = async () => {
  //     console.log('logged out successfully');
  //     try {
  //       await auth().signOut();
  //       dispatch(clearUserDataAction());
  //       navigation.navigate('LoginScreen');
  //     } catch (error) {
  //       console.error('Error during logout:', error);
  //     }
  //   };
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: isDarkMode
          ? theme.backgroundColor.dark
          : theme.backgroundColor.themeBG,
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.details}>
            <Text style={styles.userName}>Rosy Merlin</Text>
            <Text style={styles.text}>View Profile</Text>
          </View>
          <TouchableOpacity onPress={cancelNav} style={styles.cancel}>
            <Icon
              name={'close'}
              size={20}
              color={
                isDarkMode ? theme.fontColors.white : theme.fontColors.black
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
            color={isDarkMode ? theme.fontColors.white : theme.fontColors.black}
          />
          <Spacer width={widthPercentageToDP('2%')} />
          <Text
            style={[
              styles.logOutText,
              {
                color: isDarkMode
                  ? theme.fontColors.white
                  : theme.fontColors.black,
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
                  ? theme.backgroundColor.white
                  : theme.backgroundColor.dark
              }
              trackColor={
                isDarkMode
                  ? theme.backgroundColor.white
                  : theme.backgroundColor.dark
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOut}>
          <Icon
            name={'sign-out'}
            size={25}
            color={isDarkMode ? theme.fontColors.white : theme.fontColors.black}
          />
          <Text
            style={[
              styles.logOutText,
              {
                color: isDarkMode
                  ? theme.fontColors.white
                  : theme.fontColors.black,
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
