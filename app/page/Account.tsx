import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserHeader from '../component/UserHeader';
import UserList from '../component/UserList';

const lists = [
  {
    icon: {
      name: 'format-list-bulleted',
      color: '#db5c6e',
      size: 30,
    },
    title: 'My Lists',
    path: 'MyListings',
  },
  {
    icon: {
      name: 'message-outline',
      color: '#f8e885',
      size: 30,
    },
    title: 'My Messages',
    path: 'MyMessages',
  },
];

const logout = [
  {
    icon: {
      name: 'logout-variant',
      color: '#85d2c4',
      size: 30,
    },
    title: 'Log Out',
  },
];

export default function Account({ navigation }) {
  const [user, setUser] = useState({});

  const handleNavigate = useCallback(
    (item) => {
      navigation.navigate(item.path);
    },
    [navigation]
  );

  useEffect(() => {
    const getUser = async () => {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      //   console.log(user);
      setUser(user);
    };

    getUser();
  }, []);

  const logOut = useCallback(() => {
    Alert.alert('logout', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => navigation.navigate('Login') },
    ]);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <UserHeader user={user}></UserHeader>
      <UserList
        userLists={lists}
        otherStyle={{ marginTop: 50 }}
        handlePress={handleNavigate}
      ></UserList>
      <UserList
        userLists={logout}
        otherStyle={{ marginTop: 100 }}
        handlePress={logOut}
      ></UserList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // padding: 10,
    alignItems: 'center',
    // backgroundColor: 'tomato',
  },
});
