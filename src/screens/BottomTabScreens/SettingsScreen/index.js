import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  Text,
  View,
  Switch,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  TextInput,
  Image,
} from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { getStorage, ref, uploadFile, getDownloadURL, uploadBytes } from "@react-native-firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage } from '../../../redux/features/userSlice';

// Styles
import { styles } from './styles';

// Components
import Spacer from '../../../components/Spacer';

// Constants
import theme from '../../../constants/theme';
import { ThemeContext } from '../../../utils/themeContext';
import { checkAndRequestPermissions } from '../../../utils/androidPermissions';

const SettingsScreen = ({ navigation: { goBack } }) => {
  // Variables
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;
  const dispatch = useDispatch();

  // Selectors
  const store = useSelector(state => state.users.userData);

  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [profile, setProfile] = useState(null);

  const userId = store[0].userID;

  // Functions
  const fetchCurrentUser = useCallback(async () => {
    try {
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

  const handleImageUpload = () => {
    checkAndRequestPermissions();
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    Alert.alert(
      'Choose Image Source',
      'Select an image source:',
      [
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(options, handleImageLibraryCallback);
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(options, handleCameraCallback);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const handleImageLibraryCallback = async response => {
    if (response.didCancel) {
      console.log('User canceled image library');
      setProfile(null);
    } else if (response.error) {
      console.log('ImagePicker Error (Library): ', response.error);
      setProfile(null);
    } else {
      const imageUri = response.uri || response.assets?.[0]?.uri;
      console.log('imageUri', imageUri);
      setProfile(imageUri ? imageUri : null);
    }
  };

  const handleCameraCallback = async (response) => {
    try {
      if (!response) {
        console.log('Response is undefined');
        return;
      }
      if (response.didCancel) {
        console.log('User canceled taking a photo');
        return;
      }
      if (response.error) {
        console.log('Camera Error: ', response.error);
        return;
      }
      const imageUri = response.uri || (response.assets?.[0]?.uri ?? null);
      if (!imageUri) {
        console.log('Image URI is undefined');
        return;
      }
      console.log('imageUri', imageUri);
      const imageResponse = await fetch(imageUri);
      const blob = await imageResponse.blob();
      setIsEditing(false);
      console.log(blob);
      uploadImageToFirebase(blob);
    } catch (error) {
      console.error('Error handling camera callback:', error);
    }
  };
  
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
      ToastAndroid.show('Details updated successfully', ToastAndroid.SHORT);
      fetchCurrentUser();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  console.log(profile)



  const uploadImageToFirebase = async (blob) => {
    try {
      const fileName = `profile_images/${userId}.jpg`;
      console.log(("dddss"))
      const storageRef = storage().ref(fileName);
      await storageRef.put(blob);
      const downloadURL = await storageRef.getDownloadURL();
      await firestore().collection('users').doc(userId).update({
        profileImage: downloadURL,
      });
      setIsEditing(false);
      ToastAndroid.show('Details updated successfully', ToastAndroid.SHORT);
      await fetchCurrentUser();
      setProfile(null)
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };



  useEffect(() => {
    fetchCurrentUser();
  }, []);

  console.log(currentUser?.profileImage);

  // Render UI.......

  // Render header
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
          <Icon name="angle-left" size={30} color={theme.fontColors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>dfghjk</Text>
      </View>
    );
  };

  // Render Body
  const renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.profileConatiner}>
          <TouchableOpacity onPress={handleImageUpload} activeOpacity={0.7}>
            {currentUser?.profileImage !== null ? (
              <Image source={{ uri: currentUser?.profileImage }} style={styles.profile} />
            ) : (
              <Icon
                name="user-circle"
                size={100}
                color={
                  isDarkMode
                    ? theme.fontColors.hexGray
                    : theme.fontColors.inkBlack
                }
                style={styles.icon}
              />
            )}
          </TouchableOpacity>

          <Spacer width={wp('5%')} />
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
              color={
                isDarkMode ? theme.fontColors.white : theme.fontColors.black
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
      <FlatList
        data={['SETTINGS']}
        renderItem={renderBody}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader()}
      />
    </View>
  );
};

export default SettingsScreen;
