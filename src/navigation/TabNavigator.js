import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import UserScreen from '../screens/BottomTabScreens/UsersScreen';
import SettingsScreen from '../screens/BottomTabScreens/SettingsScreen';
import {ThemeContext} from '../utils/themeContext';
import theme from '../constants/theme';
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const {isDarkMode} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarVisible: route.params?.tabBarVisible ?? true,
        tabBarActiveTintColor: isDarkMode
          ? theme.fontColors.white
          : theme.fontColors.white,
        tabBarInactiveTintColor: isDarkMode
          ? theme.fontColors.black
          : theme.fontColors.hexGray,
        default: true,
        tabBarStyle: {
          backgroundColor: isDarkMode
            ? theme.backgroundColor.gray
            : theme.backgroundColor.secondaryBlack,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          position: 'absolute',
          height: '8.5%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}>
      <Tab.Screen
        name="UsersTab"
        component={UserScreen}
        options={({route}) => ({
          title: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="users" size={focused ? 35 : 25} color={color} />
          ),
          tabBarVisible: route.state ? route.state.index === 0 : true,
        })}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name="gears" size={focused ? 35 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
