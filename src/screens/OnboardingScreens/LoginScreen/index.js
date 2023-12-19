import React, {useState} from 'react';
import {ImageBackground, Image, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {styles} from './styles';
const LoginScreen = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const register = () => {
    const UserID = uuid.v4();
    firestore()
      .collection('users')
      .doc(UserID)
      .set({
        name: name,
        password: password,
        phoneNumber: phoneNumber,
        userID: UserID,
      })
      .then(resp => console.log(resp))
      .catch(errr => {
        console.log(errr);
      });
  };
  return (
    <View style={styles.body}>
      <Text style={styles.header}>
        Pik<Text style={[styles.header, {color: '#20d5d8'}]}>up</Text>
      </Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChange={value > setName(value)}></TextInput>
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChange={value > setPhoneNumber(value)}></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChange={value > setPassword(value)}></TextInput>

      <View style={styles.button}>
        <TouchableOpacity style={styles.loginbtn} onPress={register}>
          <Text style={styles.btnlabel}>sign up</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textlabel, {marginTop: 0}]}>Forget Password?</Text>
      <View
        style={{
          borderBottomWidth: 1,
          marginTop: 20,
          marginBottom: 10,
          borderStyle: 'solid',
          borderColor: '#cacbcf',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.signuplabel}>Sign up With</Text>
      </View>
      <View
        style={{
          width: '80%',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
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

export default LoginScreen;
