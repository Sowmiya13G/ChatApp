import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Avatar from '../../../assets/Imags/avatar.webp';
// Styles
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';

const UserScreen = () => {
  // Variables
  const navigation = useNavigation();

  // Use State
  const [users, setUsers] = useState([]);

  // Selectors
  const store = useSelector(state => state.users.userData);

  // Fucntions
  const fetchUsers = async () => {
    try {
      const email = store[0].email;
      const tempData = [];

      firestore()
        .collection('users')
        .where('email', '!=', email)
        .get()
        .then(resp => {
          resp.docs.forEach(doc => {
            tempData.push(doc.data());
          });
          setUsers(tempData);
        });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = item => {
    navigation.navigate('ChatScreen', {data: item, id: store[0].userID});
  };

  console.log('dsfs', users);
  const handleAddNewUserClick = () => {
    // Handle the click event here
  };

  const getRandomLightMatteColor = () => {
    const getRandomComponent = () => Math.floor(Math.random() * 290);
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <View style={[styles.body]}>
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.chatList]}
            onPress={() => handleUserClick(item)}>
            <View>
              {/* <Image source={Avatar} style={[styles.avatar]} alt='avatar' /> */}
              {/* <View style={[styles.avatar,{backgroundColor:getRandomLightMatteColor()}]}> */}
              <LinearGradient
                colors={['#fefefe', getRandomLightMatteColor()]}
                style={[
                  styles.avatar,
                  {backgroundColor: getRandomLightMatteColor()},
                ]}>
                <Text style={{color: 'black'}}>{item.name.slice(0, 1)}</Text>
              </LinearGradient>
              {/* </View> */}
            </View>
            <View>
              <Text style={{color: 'black'}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.addNewUser]}
        onPress={handleAddNewUserClick}
        activeOpacity={0.7} // Adjust the opacity during touch
      >
        <Text style={{fontSize: 20, fontWeight: '500'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;

// const filteredUsers = users
//   ? users.filter(user => user.email !== store[0].email)
//   : [];
// console.log('filteredUsers', filteredUsers);
