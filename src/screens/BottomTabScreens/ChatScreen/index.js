import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}) => {
  const {userID} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const chatRef = firestore().collection('chats').doc(userID);

      const unsubscribe = chatRef
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const newMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              createdAt: data.createdAt.toDate(),
            };
          });
          setMessages(newMessages);
        });

      return () => unsubscribe();
    };

    loadMessages();
  }, [userID]);

  const onSend = useCallback(
    async (messages = []) => {
      const chatRef = firestore().collection('chats').doc(userID);

      await chatRef.collection('messages').add({
        ...messages[0],
        createdAt: new Date(),
      });
    },
    [userID],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 'currentUserId',
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
