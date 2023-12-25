import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
// Packages
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

// Redux
import { useDispatch } from 'react-redux';
import { ToDetails } from '../../../redux/features/userSlice';

// Constants
import theme from '../../../constants/theme';

//Styles
import { styles } from './styles';

const ChatScreen = () => {
  // Variables
  const dispatch = useDispatch();
  // const { userID } = route.params;
  const route = useRoute();

  profileIcon = route.params.data.profileImage

  // UseState
  const [messages, setMessages] = useState([]);
  console.log('route', route);
  console.log('route', route.params.id);
  console.log('profile', route.params.data.profileImage)

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
  // useEffect(() => {
  //   const sub = firestore()
  //     .collection('chats')
  //     .doc(route.params.id + route.params.data.userID)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc');
  //   sub.onSnapshot(data => {
  //     const allmesg = data.docs.map(item => {
  //       return { ...item._data, createdAt: item._data.createdAt };
  //     });
  //     setMessages(allmesg);
  //   });
  //   return () => sub();
  // }, []);

  useEffect(() => {
    const query = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userID)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const unsubscribe = query.onSnapshot(data => {
      const allmesg = data.docs.map(item => {
        return { ...item._data, createdAt: item._data.createdAt };
      });
      setMessages(allmesg);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(ToDetails(route));
  }, [route]);

  // Render UI..........


  // Render send button
  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <View>
        <Text style={styles.text}>Send</Text>
      </View>
    </Send>
  );

  // Custom render message
  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (route.params.id) {
      return (
        <View style={styles.messageContainer}>
          {currentMessage.user._id !== route.params.id && (
            <Image
              source={{ uri: profileIcon }}
              style={styles.userAvatar}
            />
          )}
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: '#f0f0f0', margin: 5 },
              right: { backgroundColor: '#0084ff', margin: 5 },
            }}
            textStyle={{
              left: { color: '#000' },
              right: { color: '#fff' },
            }}
          />
        </View>
      );
    } else {
      return <Bubble {...props} />;
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: route.params.id,
      }}
      textInputProps={styles.input}
      renderSend={renderSend}
      renderMessage={renderMessage}
    />
  );
};

export default ChatScreen;
