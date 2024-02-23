import React, {useContext} from 'react';

// Packages
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/MaterialIcons';

// Custom drawer
import CustomDrawer from './CustomDrawer';

// Navigator
import {BottomTabNavigator} from '../TabNavigator';

// Screens
import ChatScreen from '../../screens/BottomTabScreens/ChatScreen';
import SettingsScreen from '../../screens/BottomTabScreens/SettingsScreen';

// Constanst
import { color } from '../../constants/theme';
import {ThemeContext} from '../../utils/themeContext';
import UserScreen from '../../screens/BottomTabScreens/UsersScreen';

const DrawerNavigator = () => {
  // variables
  const Drawer = createDrawerNavigator();
  const {isDarkMode} = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      initialRouteName="BottomTabBar"
      drawerContent={props => <CustomDrawer {...props} />}
      article
      receipt-long
      drawerStyle={{
        backgroundColor: isDarkMode
          ? color.dark
          : color.themeBG,
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: isDarkMode
          ? color.orange
          : color.candyBlue,
        drawerInactiveTintColor: isDarkMode
          ? color.white
          : color.black,
        drawerLabelStyle: {marginLeft: -20, fontSize: 18},
        drawerIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'FAQ') {
            iconName = 'question-answer';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
      })}>
      <Drawer.Screen
        name="Home"
        component={UserScreen}
        options={{
          title: '',
        }}
      />

      <Drawer.Screen
        name="FAQ"
        component={ChatScreen}
        options={{
          drawerLabel: 'FAQ',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
