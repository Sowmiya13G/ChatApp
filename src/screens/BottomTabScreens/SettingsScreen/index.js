import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  Text,
  View,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Redux
import {useSelector} from 'react-redux';

// Styles
import {styles} from './styles';

// Components
import Spacer from '../../../components/Spacer';

// Constants
import theme from '../../../constants/theme';
import {ThemeContext} from '../../../utils/themeContext';

const SettingsScreen = () => {
  // Variables
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;

  // Selectors
  const store = useSelector(state => state.users.userData);

  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');

  // Functions
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

  const uploadImage = () => {};

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(currentUser.name);
    setEditedPhoneNumber(currentUser.phoneNumber);
  };

  const handleSave = async () => {
    try {
      const userId = store[0].userID;
      await firestore().collection('users').doc(userId).update({
        name: editedName,
        phoneNumber: editedPhoneNumber,
      });
      setIsEditing(false);
      fetchCurrentUser();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  // UseEffect
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Render UI.......
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
      <Spacer height={hp('3%')} />

      <View style={styles.profileConatiner}>
        <TouchableOpacity
          style={[styles.profileImage]}
          onPress={uploadImage}
          activeOpacity={0.7}>
          <Icon
            name="user-circle"
            size={100}
            color={
              isDarkMode ? theme.fontColors.hexGray : theme.fontColors.inkBlack
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        <Spacer width={wp('5%')} />
        {/* {currentUser ? (
          <View style={styles.details}>
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}>
              {currentUser.name}
            </Text>
            <Spacer height={hp('1.5%')} />

            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}>
              {currentUser.phoneNumber}
            </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
        <TouchableOpacity onPress={handleEdit} style={styles.editIcon}>
          <Icon
            name="edit"
            size={20}
            color={isDarkMode ? theme.fontColors.white : theme.fontColors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen; */}
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}
              value={editedName}
              onChangeText={text => setEditedName(text)}
            />
            <TextInput
              style={[
                styles.textInput,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}
              value={editedPhoneNumber}
              onChangeText={text => setEditedPhoneNumber(text)}
            />
            <Spacer height={hp('1.5%')} />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.details}>
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}>
              {currentUser ? currentUser.name : 'Loading...'}
            </Text>
            <Spacer height={hp('1.5%')} />
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}>
              {currentUser ? currentUser.phoneNumber : 'Loading...'}
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={handleEdit} style={styles.editIcon}>
          <Icon
            name="edit"
            size={20}
            color={isDarkMode ? theme.fontColors.white : theme.fontColors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
{
  /* <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}>
              {currentUser.email}
            </Text> */
}
