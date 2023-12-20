import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

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

  const handleUserClick = userID => {
    navigation.navigate('ChatScreen', { userID });
  };

  console.log("dsfs", users)

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={item => item.userID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserClick(item.userID)}>
            {console.log("fff", item)}
            <View>
              <Text style={{ color: 'black' }}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserScreen;
