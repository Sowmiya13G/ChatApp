import React, {useState, useCallback, useEffect} from 'react';

// Packages
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

// Redux
import {useDispatch} from 'react-redux';
import {ToDetails} from '../../../redux/features/userSlice';

const ChatScreen = () => {
  // Variables
  const dispatch = useDispatch();
  // const { userID } = route.params;
  const route = useRoute();

  // UseState
  const [messages, setMessages] = useState([]);
  console.log('route', route);
  console.log('route', route.params.id);

  // Functions
  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMSG = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userID,
      createdAt: Date.parse(msg.createdAt),
    };
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userID)
      .collection('messages')
      .add(myMSG);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userID + route.params.id)
      .collection('messages')
      .add(myMSG);
  }, []);

  // UseEffect
  useEffect(() => {
    const sub = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userID)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    sub.onSnapshot(data => {
      const allmesg = data.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessages(allmesg);
    });
    return () => sub();
  }, []);

  useEffect(() => {
    dispatch(ToDetails(route));
  }, [route]);
  // console.log(messages)

  // Render UI..........
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: route.params.id,
      }}
    />
  );
};

export default ChatScreen;
