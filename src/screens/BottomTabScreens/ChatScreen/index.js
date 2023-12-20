import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  // const { userID } = route.params;
  const route =useRoute()
  const [messages, setMessages] = useState([]);
console.log("route",route)
console.log("route",route.params.id)

  useEffect(() => {

const sub =firestore()
.collection("chats").doc(route.params.id + route.params.data.userID)
.collection("messages").orderBy("createdAt","desc");
sub.onSnapshot(data=>{
  const allmesg =data.docs.map(item=>{
    return{...item._data,createdAt: item._data.createdAt}
  })
  setMessages(allmesg)
})
return()=>sub()
  }, []);

  const onSend = useCallback(
    async (messages = []) => {
      const msg = messages[0]
      const myMSG = {
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.userID,
        createdAt: Date.parse(msg.createdAt),

      }
      firestore()
      .collection('chats')
      .doc("" + route.params.id + route.params.data.userID)
      .collection("messages")
      .add(myMSG);
      firestore()
      .collection('chats')
      .doc("" + route.params.data.userID + route.params.id)
      .collection("messages")
      .add(myMSG);
      // await chatRef.collection('messages').add({
      //   ...messages[0],
      //   createdAt: new Date(),
      // });
    },
    [],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        // _id: "currentId",
        // _id: userID,
        _id:route.params.id

      }}
    />
  );
};

export default ChatScreen;

// import React, {useState, useEffect} from 'react';
// import {View, Text, TextInput, Button} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

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

//   return (
//     <View>
//       <Text>HIHI</Text>
// {messages.map((msg) => (
//     <Text key={msg.id}>
//       {msg.user.name}: {msg.text}
//     </Text>
//   ))}
//   <TextInput
//     value={newMessage}
//     onChangeText={(text) => setNewMessage(text)}
//     placeholder="Type your message..."
//   />
//   <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// export default ChatScreen;
