import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import socketIOClient from 'socket.io-client';

import Login from './app/page/Login';
import Register from './app/page/Register';
import Home from './app/page/Home';
import ItemDetail from './app/page/ItemDetail';
import MyListings from './app/page/MyListings';
import MyMessages from './app/page/MyMessages';
import Chat from './app/page/Chat';
import { ConversionStore } from './app/store';

const Stack = createStackNavigator();

const commonStyle = {
  headerStyle: { backgroundColor: 'tomato' },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
};

export default function App() {
  const store = new ConversionStore();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Login"
        // @ts-ignore
        screenOptions={{
          ...commonStyle,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name="Home"
          // component={Home}
          options={{
            title: 'Home',
            header: () => null,
          }}
        >
          {() => <Home ConversionStore={store}></Home>}
        </Stack.Screen>
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetail}
          options={{
            title: 'Detail',
            // header: () => null,
            headerStyle: { backgroundColor: 'tomato', opacity: 0.7 },
          }}
        />
        <Stack.Screen
          name="MyListings"
          component={MyListings}
          options={{
            title: 'MyListings',
            // header: () => null,
            // headerStyle: { backgroundColor: 'tomato', opacity: 0.7 },
          }}
        />
        <Stack.Screen
          name="MyMessages"
          component={MyMessages}
          options={{
            title: 'MyMessages',
            // header: () => null,
            // headerStyle: { backgroundColor: 'tomato', opacity: 0.7 },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: 'Chat',
            // header: () => null,
            // headerStyle: { backgroundColor: 'tomato', opacity: 0.7 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
