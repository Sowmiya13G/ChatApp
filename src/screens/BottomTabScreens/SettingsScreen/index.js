import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Text, View} from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';

// Redux
import {useSelector} from 'react-redux';

// Styles
import {styles} from './styles';

// Constants
import theme from '../../../constants/theme';
import {ThemeContext} from '../../../utils/themeContext';

const SettingsScreen = () => {
  // Variables
  const isDarkMode = useContext(ThemeContext);
  // Selectors
  const store = useSelector(state => state.users.userData);

  // State
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const userId = store[0].userID;

      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        setCurrentUser(userDoc.data());
      } else {
        console.log('User document not found');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }, [store]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <View style={styles.container}>
      {currentUser ? (
        <View>
          <Text style={styles.text}>Name: {currentUser.name}</Text>
          <Text style={styles.text}>Email: {currentUser.email}</Text>
          <Text style={styles.text}>Mobile: {currentUser.phoneNumber}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default SettingsScreen;
