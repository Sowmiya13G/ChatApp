import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

const ChatScreen = () => {
  // const { userID } = route.params;
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const loadMessages = async () => {
    //   const chatRef = firestore().collection('chats').doc(userID);

    //   const unsubscribe = chatRef
    //     .collection('messages')
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(snapshot => {
    //       const newMessages = snapshot.docs.map(doc => {
    //         const data = doc.data();
    //         return {
    //           ...data,
    //           createdAt: data.createdAt.toDate(),
    //         };
    //       });
    //       setMessages(newMessages);
    //     });

    //   return () => unsubscribe();
    // }

    // loadMessages();
    const sub = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    sub.onSnapshot(data => {
      const allmesg = data.docs.map(item => {
        return {...item, _data, createdAt: item._data.createdAt};
      });
      setMessages(allmesg);
    });
    return () => sub();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMSG = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMSG);
    firestore()
      .collection('chats')
      .doc('' + route.params.userId + route.params.data.id)
      .collection('messages')
      .add(myMSG);
    // await chatRef.collection('messages').add({
    //   ...messages[0],
    //   createdAt: new Date(),
    // });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        // _id: userID,
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
