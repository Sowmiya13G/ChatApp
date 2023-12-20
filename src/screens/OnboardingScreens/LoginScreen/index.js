import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {setUserData} from "../../../redux/features/userSlice"
// Packages
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// Styles
import { styles } from './styles';

const LoginScreen = () => {
  // variables
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useSelector(state.users.userData)

  console.log(store)
  // Use State
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');


  // Functions
  const login = () => {
    firestore()
      .collection('users')
      .where('email', '==', emailId)
      .where('password', '==', password)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('Invalid credentials');
        } else {
          console.log('Login successful');
          console.log(snapshot.docs[0].data())
          dispatch(setUserData(snapshot.docs[0].data()))
          // navigation.navigate('UserScreen');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  // render UI ........
  return (
    <View style={styles.body}>
      <Text style={styles.header}>
        Pik<Text style={[styles.header, { color: '#20d5d8' }]}>up</Text>
      </Text>

      <TextInput
        placeholder="email"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeText={value => setEmailId(value)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'grey'}
        style={styles.inputfiled}
        onChangeText={value => setPassword(value)}
        secureTextEntry
      />

      <View style={styles.button}>
        <TouchableOpacity style={styles.loginbtn} onPress={login}>
          <Text style={styles.btnlabel}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.textlabel, { marginTop: 0 }]}>Forget Password?</Text>
    </View>
  );
};

export default LoginScreen;
