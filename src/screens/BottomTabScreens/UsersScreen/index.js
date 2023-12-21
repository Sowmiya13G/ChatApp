import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Avatar from "../../../assets/Imags/avatar.webp";
// Styles
import { styles } from './styles';

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const store = useSelector(state => state.users.userData)
  useEffect(() => {
    // setUsers(store)
  }, [])

  const fetchUsers = async () => {

    try {
      const email = store[0].email
      console.log(email)
      const tempData = []
      firestore().collection('users').where("email", "!=", email).get()
        .then(resp => {
          if (resp.docs != []) {
            resp.docs.map((a) => tempData.push(a.data()))
          }
          setUsers(tempData)
        }
        )
        ;
      // const userList = usersSnapshot.docs.map(doc => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));

      // setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (item) => {
    navigation.navigate('ChatScreen', { data: item, id: store[0].userID });
  };

  console.log("dsfs", users)
  const handleAddNewUserClick = () => {
    // Handle the click event here
  };

  const getRandomLightMatteColor = () => {
    const getRandomLightValue = () => Math.floor(Math.random() * 100) + 155; // Bias towards higher values
    const r = getRandomLightValue();
    const g = getRandomLightValue();
    const b = getRandomLightValue();
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  
  return (
    <View style={[styles.body]} >
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.chatList]} onPress={() => handleUserClick(item)}>
            <View>
              {/* <Image source={Avatar} style={[styles.avatar]} alt='avatar' /> */}
              <View style={[styles.avatar,{backgroundColor:getRandomLightMatteColor()}]}>
              <Text style={{ color: 'black' }}>{item.name.slice(0,1)}</Text>
            </View>
            </View>
            <View>
              <Text style={{ color: 'black' }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.addNewUser]}
        onPress={handleAddNewUserClick}
        activeOpacity={0.7} // Adjust the opacity during touch
      >
        <Text style={{ fontSize: 20, fontWeight: '500' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;
