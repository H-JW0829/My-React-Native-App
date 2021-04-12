import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyText from './Form/Text';

export default function ChatItem({ isMe = true, avatar, text }) {
  // const flexDirection = isMe?'row-reserve':'row'

  return (
    <View
      style={[
        styles.container,
        // @ts-ignore
        { flexDirection: `${isMe ? 'row-reverse' : 'row'}` },
      ]}
    >
      <Image source={{ uri: avatar }} style={styles.avatar}></Image>
      <MyText style={styles.text}>{text}</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    // backgroundColor: 'tomato',
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    marginBottom: 1,
    paddingVertical: 3,
    height: 38,
  },
  text: {
    color: '#000',
    fontSize: 15,
    marginLeft: 5,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginLeft: 6,
  },
});
