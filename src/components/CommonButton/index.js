import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
const CommonButton = ({
  signUpButton,
  label = '',
  logInButton,
  handlePress = () => {},
}) => {
  return (
    <View>
      <TouchableOpacity
        style={
          signUpButton
            ? styles.signUpButton
            : logInButton
            ? styles.logInButton
            : ''
        }
        onPress={handlePress}>
        <Text
          style={
            signUpButton
              ? styles.signUpButtonText
              : logInButton
              ? styles.logInButtonText
              : ''
          }>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CommonButton;
