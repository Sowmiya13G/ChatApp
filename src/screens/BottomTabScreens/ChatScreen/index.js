import React, {useState, useCallback, useEffect} from 'react';

// packages
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route, navigation}) => {
  // Variables
  const {userID} = route.params;

  // UseState
  const [messages, setMessages] = useState([]);

  // Function
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

  // Use Effect
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

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDoc = await firestore().collection('users').doc(userID).get();
        const userName = userDoc.data().email;
        navigation.setOptions({
          title: userName,
        });
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, [userID, navigation]);

  // Render Body
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084FF',
          },
          left: {
            backgroundColor: '#ECECEC',
          },
        }}
      />
    );
  };
  // Render UI......
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 'currentUserId',
      }}
      renderBubble={renderBubble}
    />
  );
};

export default ChatScreen;
