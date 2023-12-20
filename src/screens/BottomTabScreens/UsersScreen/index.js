import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

// Packages
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// Redux
import {useSelector} from 'react-redux';

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

  useEffect(() => {
    fetchUsers();
    //   // setUsers(store)
  }, []);
  console.log('dsfs', users);

  // Render UI ...........
  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleUserClick(item)}>
            {console.log('fff', item)}
            <View>
              <Text style={{color: 'black'}}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserScreen;

// const filteredUsers = users
//   ? users.filter(user => user.email !== store[0].email)
//   : [];
// console.log('filteredUsers', filteredUsers);
