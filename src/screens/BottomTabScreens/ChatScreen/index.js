import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text, Image, Platform } from 'react-native';
// Packages
import { GiftedChat, Send, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ToDetails, setMessagesStore } from '../../../redux/features/userSlice';

// Constants
import theme from '../../../constants/theme';
import { ThemeContext } from '../../../utils/themeContext';
import Avatar from '../../../assets/Imags/avatar.webp';
import sendIcon from '../../../assets/Imags/send.png';


//Styles
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const ChatScreen = ({ navigation: { goBack } }) => {
  const route = useRoute();
  const userData = useSelector((state) => state.users.userData);

  // Variables
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [formattedLastSeen, setFormattedLastSeen] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [isTypingStatus, setIsTypingStatus] = useState(false);

  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;
  // const { userID } = route.params;
  const UserID = userData[0]?.userID;
  profileIcon = route.params.data.profileImage
  // UseState
  const [messages, setMessages] = useState([]);

  const userStatusRef = firestore().collection('users').doc(UserID);

  const updateStatus = async () => {
    try {
      await userStatusRef.update({
        isTyping: isTyping,
      });
      console.log(' isTyping Status successfully updated ');
    } catch (error) {
      console.error('Error updating lastSeen:', error);
    }
  }
  useEffect(() => {
    updateStatus()
  }, [isTyping])

  const formatLastSeen = (lastSeen) => {
    const currentDate = new Date();
    const lastSeenDate = new Date(lastSeen);
    const timeDifference = currentDate - lastSeenDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 8) {
      return 'Online';
    }
    else if (seconds < 60 || minutes < 30) {
      return `Last Seen Recently`;
    }
    else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "Minute" : "Minutes"} ago`;
    }
    else if (hours < 24) {
      return `${hours} ${hours === 1 ? "Hour" : "Hours"} ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(lastSeen).toLocaleString('en-US', options);
      // return 'Online';

    }
  };



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
    setIsTyping(false);
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
      setShowComponent(true);

    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(ToDetails(route));
  }, [route]);

  useEffect(() => {
    const query = firestore()
      .collection('users')
      .doc(route.params.data.userID)
    const unsubscribe = query.onSnapshot(userDoc => {
      setFormattedLastSeen(formatLastSeen(userDoc.data()?.lastSeen))
      setIsTypingStatus(userDoc.data()?.isTyping)
    });
    return () => unsubscribe();
  }, [new Date()]);




  // Render send button
  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <Image style={{
        width: widthPercentageToDP("5%"),
        height: widthPercentageToDP("5%"),

      }}
        resizeMode='contain'
        source={sendIcon} />
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
              source={{ uri: route?.params?.data?.profileImage }}
              resizeMode='contain'
              style={styles.userAvatar}
            />
          )}
          <Bubble
            {...props}
            wrapperStyle={{
              left: { backgroundColor: '#fefefefe', margin: 5 },
              right: { backgroundColor: '#22313f', margin: 5 },
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





  const onInputTextChanged = (text) => {
    if (text.length > 0 && !isTyping) {
      setIsTyping(true); // Set isTyping state to true when user starts typing
    } else if (text.length === 0 && isTyping) {
      setIsTyping(false); // Set isTyping state to false when user stops typing
    }
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowComponent(true);
  //   }, 1500);
  //   return () => clearTimeout(timeout);
  // }, []);

  const renderChatEmpty = () => {
    return showComponent && (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '180deg' }] }}>
        <Image
          source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/no-messages-8044859-6430768.png" }}
          style={{
            width: widthPercentageToDP("40%"),
            height: widthPercentageToDP("40%")
          }}
          resizeMode='contain'
        />
        <Text style={{ color: "#000" }}> No messages yet.</Text>
      </View>
    );
  };



  const renderCustomActions = () => (
    <TouchableOpacity >
      <View style={{ padding: 10 }}>
        <Text>Send Image</Text>
      </View>
    </TouchableOpacity>
  );
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#000',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        // width: widthPercentageToDP("100%"),
        // alignItems: 'center',
        // justifyContent:"center"
      }}
      primaryStyle={{ alignItems: 'center', }}
    >
      {/* <Composer
        {...props}
        placeholder="Type a message..."
        textInputStyle={{
          width: widthPercentageToDP("10%"),
          color: '#fff', fontSize: 16,

        }}
      /> */}
      {/* <Send {...props} style={styles.sendContainer}>
        <Image style={{
          width: widthPercentageToDP("5%"),
          height: widthPercentageToDP("5%"),

        }}
          resizeMode='contain'
          source={sendIcon} />
      </Send> */}
    </InputToolbar>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
          <Icon name="angle-left" size={30} color={isDarkMode ? theme.fontColors.white : theme.fontColors.black} />
        </TouchableOpacity> */}
        <Image source={profileIcon !== null ? { uri: profileIcon } : Avatar}
          style={styles.headerAvatar} />
        <View>
          <Text style={styles.headerTitle}>{route.params.data.name}</Text>
          <Text>{formattedLastSeen}</Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        infiniteScroll={true}
        user={{
          _id: route.params.id,
        }}
        textInputProps={{
          style: {
            width: widthPercentageToDP("90%"),
            // backgroundColor: '#303841', // background color of the text input
            // backgroundColor: '#000', // background color of the text input
            borderRadius: 10, // border radius of the text input
            // marginorizontal: widthPercentageToDP("5%"), 
            paddingHorizontal: widthPercentageToDP("2%"), // horizontal padding inside the text input
            paddingVertical: 8, // vertical padding inside the text input
            fontSize: 16, // font size of the text input
            margin: 2,
            color: "#fff"
          },
          placeholderTextColor: '#dddd', // color of the placeholder text
          placeholder: 'Type your message...', // placeholder text
        }}
        renderSend={renderSend}
        keyboardShouldPersistTaps="handled"
        renderMessage={renderMessage}
        renderChatEmpty={renderChatEmpty}
        renderInputToolbar={renderInputToolbar}
        isTyping={isTypingStatus}
        onInputTextChanged={onInputTextChanged}
        imageProps={{
          resizeMode: 'cover', // Example of a prop passed to the image component
          style: { width: 200, height: 150 }, // Example of styling applied to the image component
        }}
        isLoadingEarlier={showComponent ? false : true}
        loadEarlier={showComponent ? false : true}
      />
    </View>

  );
};

export default ChatScreen;
