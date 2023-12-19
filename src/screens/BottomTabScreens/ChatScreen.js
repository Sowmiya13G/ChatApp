// Create a ChatScreen component
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  //   useEffect(() => {
  //     const messagesRef = database().ref('/messages');

  //     const onSnapshot = (snapshot) => {
  //       const data = snapshot.val();
  //       if (data) {
  //         const messagesArray = Object.keys(data).map((key) => ({
  //           ...data[key],
  //           id: key,
  //         }));
  //         setMessages(messagesArray);
  //       }
  //     };

  //     messagesRef.on('value', onSnapshot);

  //     return () => {
  //       messagesRef.off('value', onSnapshot);
  //     };
  //   }, []);

  //   const sendMessage = () => {
  //     const user = auth().currentUser;

  //     if (user) {
  //       database().ref('/messages').push({
  //         text: newMessage,
  //         user: {
  //           id: user.uid,
  //           name: user.displayName,
  //         },
  //       });
  //       setNewMessage('');
  //     }
  //   };

  return (
    <View>
      {/* {messages.map((msg) => (
        <Text key={msg.id}>
          {msg.user.name}: {msg.text}
        </Text>
      ))} 
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} /> */}
      <Text>HIHI</Text>
    </View>
  );
};

export default ChatScreen;
