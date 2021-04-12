import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import MyText from './Form/Text';

interface Params {
  otherStyle?: Object;
  user: Object;
}

export default function UserHeader({ user, otherStyle }: Params) {
  return (
    <View style={[styles.container, otherStyle]}>
      <View style={styles.imageWrapper}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{ height: '100%', width: '100%' }}
          ></Image>
        ) : (
          <Image
            source={require('../assets/app-logo.png')}
            style={{ height: '100%', width: '100%' }}
          ></Image>
        )}
      </View>
      <View style={styles.textWrapper}>
        <View>
          <MyText style={styles.nameText}>{user.nickname}</MyText>
        </View>
        <View>
          <MyText style={styles.telText}>{user.tel}</MyText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 110,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    overflow: 'hidden',
  },
  textWrapper: {
    marginLeft: 12,
    justifyContent: 'space-evenly',
    height: '100%',
  },
  nameText: {
    fontSize: 20,
    color: '#000',
  },
  telText: {
    fontSize: 14,
    color: 'grey',
  },
});
