import 'react-native-gesture-handler';

import React, {useContext} from 'react';
import {StatusBar, View} from 'react-native';

// Packages
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import SignupScreen from '../screens/OnboardingScreens/SignupScreen';
import LoginScreen from '../screens/OnboardingScreens/LoginScreen';
import ChatScreen from '../screens/BottomTabScreens/ChatScreen';
import UserScreen from '../screens/BottomTabScreens/UsersScreen';

// Navigators
import {BottomTabNavigator} from './TabNavigator';
import DrawerNavigator from './DrawerNav/DrawerNavigation';

// Constants
import theme from '../constants/theme';
import {useSelector} from 'react-redux';

// Utils
import {ThemeContext} from '../utils/themeContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const toData = useSelector(state => state.users.ToDetails);
  const userData = useSelector(state => state.users.userData);

  const {isDarkMode} = useContext(ThemeContext);

  console.log('name', userData);
  const Name = toData?.params?.data?.name;
  const phoneNumber = toData?.params?.data?.phoneNumber;
  const initialRouteName = userData.length > 0 ? 'UserScreen' : 'SignupScreen';
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        backgroundColor={
          isDarkMode
            ? theme.backgroundColor.dark
            : theme.backgroundColor.themeBG
        }
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="UserScreen"
            component={DrawerNavigator}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{title: Name ? Name : phoneNumber, headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
