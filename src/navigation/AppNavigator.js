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
// import {BottomTabNavigator} from './TabNavigator';

// Constants
import theme from '../constants/theme';

// Utils
// import {ThemeContext} from '../utils/themeContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // const {isDarkMode} = useContext(ThemeContext);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={theme.backgroundColor.themeBG}
        barStyle={'dark-content'}
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName={SignupScreen}>
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
            component={UserScreen}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{title: '', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
