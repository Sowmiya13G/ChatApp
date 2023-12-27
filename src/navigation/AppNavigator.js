
import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { AppState } from 'react-native'; // Import AppState

// Packages
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';


// Screens
import SignupScreen from '../screens/OnboardingScreens/SignupScreen';
import LoginScreen from '../screens/OnboardingScreens/LoginScreen';
import ChatScreen from '../screens/BottomTabScreens/ChatScreen';
import UserScreen from '../screens/BottomTabScreens/UsersScreen';
import SettingsScreen from '../screens/BottomTabScreens/SettingsScreen';

// Navigators
import { BottomTabNavigator } from './TabNavigator';
import DrawerNavigator from './DrawerNav/DrawerNavigation';

// Constants
import theme from '../constants/theme';
import { ThemeContext } from '../utils/themeContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const toData = useSelector((state) => state.users.ToDetails);
  const userData = useSelector((state) => state.users.userData);
  const [isOnline, setOnline] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('unknown');
  const [InitialRouteName, setInitialRouteName] = useState("UserScreen")
  const [tempUserId, setTempUserId] = useState("")
  const { isDarkMode } = useContext(ThemeContext);


  const UserID = userData[0]?.userID;

  useEffect(() => {

    if (userData.length) {
      setTempUserId(UserID)
      const userStatusRef = firestore().collection('users').doc(UserID);
      const updateStatus = async (isConnected) => {
        try {
          await userStatusRef.update({
            lastSeen:  Date(),
          });
          console.log('Status successfully updated to', isConnected ? 'online' : 'offline');
        } catch (error) {
          console.error('Error updating lastSeen:', error);
        }
      };

      const onNetworkChange = (state) => {
        const isConnected = state.isConnected;
        setNetworkStatus(isConnected ? 'online' : Date());
        updateStatus(isConnected);
      };

      const handleAppStateChange = (nextAppState) => {
        console.log("networkStatus", nextAppState)
        if (nextAppState === 'background') {
          // App is in the background, update status to 'offline'
          updateStatus(false);
        } else (updateStatus(true))
      };

      NetInfo.fetch().then(onNetworkChange); // Initial network status

      const unsubscribeNetwork = NetInfo.addEventListener(onNetworkChange);
      AppState.addEventListener('change', handleAppStateChange);

      const intervalId = setInterval(() => {
        // Call updateStatus every minute
        updateStatus(true);
      }, 60000);
      return () => {
        unsubscribeNetwork();
        clearInterval(intervalId);

      };
    }
    else {
      try {

        firestore().collection('users').doc(tempUserId).update({
          lastSeen: Date(),
        });
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }

  }, [userData, Date()]);

  const initialRouteName = () => {
    return userData.length > 0 ? 'UserScreen' : 'SignupScreen';
  };

  useEffect(() => {
    // Call the initialRouteName function when userData changes
    const routeName = initialRouteName();
    console.log(routeName);
  }, [userData])
console.log(initialRouteName(),"ffffff")
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar
        backgroundColor={
          isDarkMode
            ? theme.backgroundColor.dark
            : theme.backgroundColor.themeBG
        }
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName()}>
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ title: '', headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: '', headerShown: false }}
          />
          <Stack.Screen
            name="UserScreen"
            component={DrawerNavigator}
            options={{ title: '', headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ title:"", headerShown: false }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: '', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
