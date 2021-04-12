import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Business from './Business';
import Account from './Account';
import Add from './Add';
import { initIO } from '../common/utils';
import { userStore } from '../store';

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  useEffect(() => {
    const user = userStore.user;
    initIO(user);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Add') {
              return (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 35, // space from bottombar
                    height: 58,
                    width: 58,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e9517c',
                      borderRadius: 58,
                    }}
                  >
                    <Image
                      source={require('../assets/add.png')}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: '#f1f6f9',
                        alignContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }
            let iconName;
            route.name === 'Business'
              ? (iconName = 'home')
              : (iconName = 'user');
            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel: false,
          labelStyle: {
            paddingBottom: 3,
            fontSize: 14,
          },
          style: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: Platform.OS === 'ios' ? 100 : 70,
          },
        }}
      >
        <Tab.Screen
          name="Business"
          component={Business}
          options={{
            title: 'Feed',
          }}
        />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
});
