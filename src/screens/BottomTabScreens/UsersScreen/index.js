import React, { useEffect, useState, useContext, useRef } from 'react';
import { Text, View, FlatList, TouchableOpacity, Animated, Image, Easing, Alert } from 'react-native';

// Packages
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Constants
import Avatar from '../../../assets/Imags/avatar.webp';
import theme from '../../../constants/theme';
import { ThemeContext } from '../../../utils/themeContext';

// Components
import Spacer from '../../../components/Spacer';

// Styles
import { styles } from './styles';
import { setUserDataMesssage } from '../../../redux/features/userSlice';

const UserScreen = () => {
  const dispatch = useDispatch()
  // Variables
  const stored = useSelector(state => state.users.userMessageLog);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  fontTheme = isDarkMode ? theme.fontColors.white : theme.fontColors.black;

  // Use State
  const [users, setUsers] = useState(stored || []);
  const [showIcons, setShowIcons] = useState(false);

  // Redux Selector
  const store = useSelector(state => state.users.userData);


  // Fade-in and Fade-out Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to handle fade-in animation
  const fadeInAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      easing: Easing.ease, // Optional easing function, you can customize it
      useNativeDriver: true,
    }).start(() => {

    });
  };

  // Function to handle fade-out animation
  const fadeOutAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setShowIcons(false);
      fadeAnim.setValue(0); // Reset the fadeAnim value
    });
  };

  useEffect(() => {
    if (showIcons) {
      fadeInAnimation();
    } else {
      fadeOutAnimation();
    }
  }, [showIcons]);



  // Fetch Users
  // const fetchUsers = async () => {
  //   try {
  //     const email = store[0].email;
  //     const tempData = [];

  //     firestore()
  //       .collection('users')
  //       .where('email', '!=', email)
  //       .get()
  //       .then(resp => {
  //         resp.docs.forEach(doc => {
  //           tempData.push(doc.data());
  //         });
  //         setUsers(tempData);
  //       });
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };





  // const fetchUsers = async () => {
  //   try {
  //     const email = store[0].email;
  //     const tempData = [];
  //     const batch = firestore().batch(); // Initialize batch

  //     const usersSnapshot = await firestore().collection('users').where('email', '!=', email).get();

  //     for (const userDoc of usersSnapshot.docs) {
  //       const userData = userDoc.data();
  //       const chatDocRef = firestore().collection('chats').doc(`${store[0].userID}${userData.userID}`);
  //       const userChatRef = chatDocRef.collection('messages');

  //       // Fetch last message
  //       const lastMessageQuery =await userChatRef.orderBy('createdAt', 'desc').limit(1).get();
  //       const lastMessage = lastMessageQuery.docs.length > 0 ? lastMessageQuery.docs[0].data() : null;

  //       // Fetch unread messages count
  //       const unreadMessagesQuery = await userChatRef.where('readed', '==', false).get();
  //       const unreadMessagesCount = unreadMessagesQuery.size;

  //       // Add operations to batch (optional)
  //       // batch.update(chatDocRef, { lastMessage }); // Example if you want to update a document in batch

  //       tempData.push({ ...userData, lastMessage, unreadMessagesCount });
  //     }

  //     // Commit batched operations (optional)
  //     // await batch.commit();

  //     tempData.sort((a, b) => {
  //       const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0);
  //       const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0);
  //       return dateB - dateA;
  //     });

  //     setUsers(tempData);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };


  useEffect(() => {
    const email = store[0].email;
    const query = firestore().collection('users').where('email', '!=', email);

    const fetchUsers = async (query) => {
      try {
        const tempData = [];

        // Get users based on the provided query
        const usersSnapshot = await query.get();

        // Fetch last message and unread messages count for each user
        for (const userDoc of usersSnapshot.docs) {
          const userData = userDoc.data();
          const userId = userData.userID;

          // Fetch last message
          const lastMessageSnapshot = await firestore()
            .collection('chats')
            .doc(`${store[0].userID}${userId}`)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .get();

          const lastMessage = lastMessageSnapshot.docs.length > 0 ? lastMessageSnapshot.docs[0].data() : null;

          // Fetch unread messages count
          const unreadMessagesSnapshot = await firestore()
            .collection('chats')
            .doc(`${userId}${store[0].userID}`)
            .collection('messages')
            .where('readed', '==', false)
            .get();

          const unreadMessagesCount = unreadMessagesSnapshot.size;

          // Push user data along with last message and unread messages count to tempData array
          tempData.push({ ...userData, lastMessage, unreadMessagesCount });
        }

        // Sort users based on the timestamp of the last message
        tempData.sort((a, b) => {
          const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0);
          const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0);
          return dateB - dateA;
        });

        // Update state with fetched users
        setUsers(tempData);
        dispatch(setUserDataMesssage(tempData))
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Listen to changes in the users collection and fetch users
    const unsubscribe = query.onSnapshot((snapshot) => {
      fetchUsers(query);
    });

    // Unsubscribe from snapshot listener when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);





  const handleUserClick = (item) => {
    navigation.navigate('ChatScreen', { data: item, id: store[0].userID });
  };

  const handleAddNewUserClick = () => {
    if (showIcons) {
      fadeOutAnimation()
    } else {
      setShowIcons(true)
    }
  };

  const getRandomLightMatteColor = () => {
    const getRandomComponent = () => Math.floor(Math.random() * 290);
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Navigation
  const goToProfile = () => {
    navigation.navigate('SettingsScreen');
  };

  // Render UI.......

  // Render header
  renderHeader = () => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode
              ? theme.backgroundColor.dark
              : theme.backgroundColor.themeBG,
          },
        ]}>
        {/* <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
          <Icon name="angle-left" size={30} color={theme.fontColors.black} />
        </TouchableOpacity> */}
        <Text style={[
          styles.title,
          {
            color: isDarkMode
              ? theme.fontColors.white
              : theme.fontColors.black,
          }
        ]}>PikUp</Text>
      </View>
    );
  };
  const isToday = (date) => {
    const today = new Date();
    const compareDate = new Date(date);

    return (
      today.getDate() === compareDate.getDate() &&
      today.getMonth() === compareDate.getMonth() &&
      today.getFullYear() === compareDate.getFullYear()
    );
  };


  const deleteUser = async (UserID) => {
    const userStatusRef = firestore().collection('users').doc(UserID);
    try {
      await userStatusRef.delete();
      console.log("User document deleted successfully.");
      // fetchUsers()
    } catch (error) {
      console.error("Error deleting user document:", error);
    }
  };

  const handleLongPress = (messageId) => {
    console.log(messageId, "messageId")
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteUser(messageId?.userID),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const renderBody = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={[styles.chatList, {
            backgroundColor: isDarkMode
              ? theme.fontColors.inkBlack
              : theme.backgroundColor.lightGray,
          },]}
          onPress={() => handleUserClick(item)}
          onLongPress={() => handleLongPress(item)}
        >
          <View style={styles.avatarFrame} >
            {item.profileImage != null ? (
              <Image
                source={{ uri: item?.profileImage }}
                style={[styles.avatar]}
                alt="avatar"
              />
            ) : (
              <Image
                source={Avatar}
                style={[styles.avatar]}
                alt="avatar"
              />
            )}
          </View>
          <Spacer width={widthPercentageToDP('2%')} />
          <View>
            <Text
              style={[
                styles.text,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.black,
                },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                styles.textmsg,
                {
                  color:
                    theme.fontColors.hexGray

                  // color: item?.lastMessage?.sendBy == store[0]?.userID
                  //   ? theme.fontColors.hexGray
                  //   : theme.fontColors.green,
                },
              ]}
              numberOfLines={1}
            >

              {item?.lastMessage ? item.lastMessage?.text : ''}
            </Text>
          </View>

          <View style={styles.msgDate} >
            {item?.unreadMessagesCount !== 0 && (
              <View style={{ backgroundColor: "#388e3c", justifyContent: "center", alignItems: "center", borderRadius: 50, width: widthPercentageToDP("5%"), height: widthPercentageToDP("5%") }}>
                <Text style={{ color: "#fff", paddingHorizontal: 2 }}>{item?.unreadMessagesCount}</Text>
              </View>
            )}

            {/* {item?.lastMessage !== null ? item?.lastMessage?.sendBy == store[0]?.userID ?

              <Icon
                name="angle-double-right"
                size={20}
                color={theme.fontColors.black}
                style={styles.sentIcon}

              />
              :

              <Icon
                name="angle-double-left"
                size={20}
                color={"#388e3c"}
                style={styles.sentIcon}
              /> : ""
            } */}
            <Text
              style={[
                styles.msgTime,
                {
                  color: isDarkMode
                    ? theme.fontColors.white
                    : theme.fontColors.inkDark,
                },
              ]}
            >

              {item.lastMessage ? formatTimestamp(item.lastMessage.createdAt) : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);

    if (isToday(messageDate)) {
      return messageDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? theme.backgroundColor.dark
            : theme.backgroundColor.themeBG,
        },
      ]}
    >
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={renderBody}
        ListHeaderComponent={renderHeader()}
      />

      <Animated.View
        style={[
          styles.iconsContainer,
          // { opacity: fadeAnim, transform: [{ translateY: fadeAnim }] },
        ]}
      >
        {showIcons ? (
          <Animated.View
            style={[
              styles.iconContainer,
              { opacity: fadeAnim, transform: [{ translateY: fadeAnim }] },
            ]}
          >
            {/* First Icon */}
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={() => console.log('Edit')}
            >
              <Icon
                name="user"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />

            {/* Second Icon */}
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={() => console.log('User Profile')}
            >
              <Icon
                name="user-plus"
                size={20}
                color={theme.fontColors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />

            {/* Third Icon */}
            <TouchableOpacity
              style={styles.addNewUser}
              onPress={goToProfile}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}
              >
                <Icon
                  name="gear"
                  size={20}
                  color={theme.fontColors.black}
                  style={styles.icon}
                />
              </Animated.View>
            </TouchableOpacity>
            <Spacer height={heightPercentageToDP('2%')} />
          </Animated.View>
        ) : null}

        {/* Animated Pencil Icon */}
        <TouchableOpacity
          style={[styles.addNewUser]}
          onPress={handleAddNewUserClick}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          >
            <Icon
              name="pencil"
              size={20}
              color={theme.fontColors.black}
              style={styles.icon}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default UserScreen;
