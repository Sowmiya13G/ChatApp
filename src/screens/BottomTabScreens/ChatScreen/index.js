import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
// Packages
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Redux
import { useDispatch } from 'react-redux';
import { ToDetails, setMessagesStore } from '../../../redux/features/userSlice';

// Constants
import theme from '../../../constants/theme';
import { ThemeContext } from '../../../utils/themeContext';
//Styles
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatScreen = ({ navigation: { goBack } }) => {
  const route = useRoute();
  // Variables
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [formattedLastSeen, setFormattedLastSeen] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;
  // const { userID } = route.params;

  profileIcon = route.params.data.profileImage

  // UseState
  const [messages, setMessages] = useState([]);


  // Functions
  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMSG = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userID,
      createdAt: Date(),
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
      dispatch(setMessagesStore(allmesg))
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

  const fetchCurrentUser = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(route.params.data.userID).get();
      if (userDoc.exists) {
        setCurrentUser(userDoc.data());
        console.log(userDoc.data().lastSeen)
      } else {
        console.log('User document not found');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const formatLastSeen = (lastSeen) => {
    const currentDate = new Date();
    const lastSeenDate = new Date(lastSeen);
    console.log("formatLastSeen", currentDate,"formatLastSeen", lastSeenDate)
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
  useEffect(() => {
    fetchCurrentUser()
  }, [])
  // ... (rest of your component)
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(currentUser.lastSeen, "lastSeen")
      fetchCurrentUser()
      const formattedTime = formatLastSeen(currentUser.lastSeen);
      setFormattedLastSeen(formattedTime);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [route.params.data.lastSeen,new Date()]);


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
          <Icon name="angle-left" size={30} color={isDarkMode ? theme.fontColors.white : theme.fontColors.black} />
        </TouchableOpacity> */}
        <Image source={{ uri: route.params.data.profileImage }} style={styles.headerAvatar} />
        <View>
          <Text style={styles.headerTitle}>{route.params.data.name}</Text>
          <Text>{formattedLastSeen}</Text>
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
