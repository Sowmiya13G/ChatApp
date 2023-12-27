import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
// Packages
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Redux
import { useDispatch } from 'react-redux';
import { ToDetails } from '../../../redux/features/userSlice';

// Constants
import theme from '../../../constants/theme';
import { ThemeContext } from '../../../utils/themeContext';
//Styles
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatScreen = ({ navigation: { goBack } }) => {
  // Variables
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;
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

  const formatLastSeen = (lastSeen) => {
    const currentDate = new Date();
    const lastSeenDate = new Date(lastSeen);
  
    const timeDifference = currentDate - lastSeenDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return 'Online';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(lastSeen).toLocaleString('en-US', options);
    }
  };
  
  console.log(route.params.data.name)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
          <Icon name="angle-left" size={30} color={isDarkMode ? theme.fontColors.white : theme.fontColors.black} />
        </TouchableOpacity> */}
        <Image source={{ uri: route.params.data.profileImage }} style={styles.headerAvatar} />
        <View>
          <Text style={styles.headerTitle}>{route.params.data.name}</Text>
          <Text>{formatLastSeen(route.params.data.lastSeen)}</Text>
        </View>
      </View>
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
    </View>

  );
};

export default ChatScreen;
