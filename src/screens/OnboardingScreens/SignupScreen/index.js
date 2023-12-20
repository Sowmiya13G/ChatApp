import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

// Styles
import {styles} from './styles';

// Components
import CommonButton from '../../../components/CommonButton';
import Spacer from '../../../components/Spacer/index';

const SignupScreen = () => {
  // Variables
  const navigation = useNavigation();

  // Use State
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  // Functions
  const register = () => {
    const UserID = uuid.v4();
    firestore()
      .collection('users')
      .doc(UserID)
      .set({
        name: name,
        email: emailId,
        phoneNumber: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        userID: UserID,
      })
      .then(resp => {
        console.log(resp);
        console.log('Signup successful');
        navigation.navigate('UserScreen');
      })
      .catch(errr => {
        console.log('errr');
      });
  };

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  // render UI ........
  return (
    <View style={styles.body}>
      <Text style={styles.header}>
        Pik<Text style={[styles.header, {color: '#20d5d8'}]}>up</Text>
      </Text>

      <TextInput
        placeholder="email"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeText={value => setEmailId(value)}></TextInput>
      <TextInput
        placeholder="Name"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeTextText={value => setName(value)}></TextInput>
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeText={value => setPhoneNumber(value)}></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeText={value => setPassword(value)}></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeText={value => setconfirmPassword(value)}></TextInput>

      <View style={styles.buttonConatiner}>
        <CommonButton logInButton label="SIGN UP" handlePress={register} />
        <CommonButton logInButton label="LOG IN" handlePress={goToLogin} />
      </View>
      <Text style={[styles.textlabel, {marginTop: 0}]}>Forget Password?</Text>
      <View style={styles.signUp}>
        <Text style={styles.signuplabel}>Sign up With</Text>
      </View>
      <View style={styles.buttonConatiner}>
        <TouchableOpacity style={styles.signbtn}>
          <Text style={{color: '#20d5d8'}}>GOOGLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signbtn}>
          <Text style={{color: '#20d5d8'}}>EMAIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;