import React, {useState, useEffect, useCallback, useContext} from 'react';
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
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setProfileImage} from '../../../redux/features/userSlice';

// Styles
import {styles} from './styles';

// Components
import Spacer from '../../../components/Spacer';

// Constants
import theme from '../../../constants/theme';
import {ThemeContext} from '../../../utils/themeContext';
import {checkAndRequestPermissions} from '../../../utils/androidPermissions';

const SettingsScreen = ({navigation: {goBack}}) => {
  // Variables
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);
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
      {cancelable: true},
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
      //   if (profile) {
      //     const fileExtension = profile.split('.').pop() || 'jpg';
      //     const imageRef = storage()
      //       .ref()
      //       .child(`profile_images/${userId}.${fileExtension}`);
      //     console.log('imageRef....', imageRef);
      //     const downloadUrl = await imageRef.getDownloadURL();
      //     dispatch(setProfileImage(downloadUrl));
      //   }

      await handleSaveImage();
    }
  };

  const handleCameraCallback = async response => {
    if (response.didCancel) {
      console.log('User canceled taking a photo');
      setProfile(null);
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
      setProfile(null);
    } else {
      const imageUri = response.uri || response.assets?.[0]?.uri;
      console.log('imageUri', imageUri);
      setProfile(imageUri ? imageUri : null);
      //   if (profile) {
      //     const fileExtension = profile.split('.').pop() || 'jpg';
      //     const imageRef = storage()
      //       .ref()
      //       .child(`profile_images/${userId}.${fileExtension}`);
      //     console.log('imageRef....', imageRef);
      //     const downloadUrl = await imageRef.getDownloadURL();

      //     dispatch(setProfileImage(downloadUrl));
      //   }
      await handleSaveImage();
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

  const handleSaveImage = async () => {
    try {
      const userId = store[0].userID;
      const userDocRef = firestore().collection('users').doc(userId);
      console.log('profile....', profile);
      if (profile) {
        const fileExtension = profile.split('.').pop() || 'jpg';
        const imageRef = storage()
          .ref()
          .child(`profile_images/${userId}.${fileExtension}`);
        console.log('imageRef....', imageRef);

        const response = await fetch(profile);
        console.log('response....', response);

        const blob = await response.blob();
        console.log('blob....', blob);

        await imageRef.put(blob);

        const downloadUrl = await imageRef.getDownloadURL();
        console.log('downloadUrl', downloadUrl);
        await userDocRef.update({
          profileImage: downloadUrl,
        });
      } else {
        await userDocRef.update({
          profileImage: null,
        });
      }

      setIsEditing(false);
      await fetchCurrentUser();
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert('Error', 'Failed to update user details. Please try again.');
    }
  };
  // UseEffect
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  console.log(currentUser?.profileImage);

  // Render UI.......

  // Render header
  renderHeader = () => {
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

  renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.profileConatiner}>
          <TouchableOpacity onPress={handleImageUpload} activeOpacity={0.7}>
            {profile ? (
              <Image source={{uri: profile}} style={styles.profile} />
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
