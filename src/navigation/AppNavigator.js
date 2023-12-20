import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, View} from 'react-native';
import {BottomTabNavigator} from './TabNavigator';
import SignupScreen from '../screens/OnboardingScreens/SignupScreen';
import ChatScreen from '../screens/BottomTabScreens/ChatScreen';
// import {ThemeContext} from '../utils/themeContext';
import commonImagePath from '../constants/images';
import theme from '../constants/theme';
const Stack = createStackNavigator();

const AppNavigator = () => {
  //   const {isDarkMode} = useContext(ThemeContext);

  return (
    <View style={{flex: 1}}>
      {/* <StatusBar
        backgroundColor={
          isDarkMode ? theme.backgroundColor.dark : theme.backgroundColor.white
        }
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      /> */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName={SignupScreen}>
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{title: '', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
