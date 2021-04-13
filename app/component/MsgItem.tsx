import React, { useCallback } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import MyText from './Form/Text';

interface Msg {
  from: string;
  num: number;
  msg: string;
  avatar: Object;
}

interface Params {
  msg: Msg;
  otherStyle?: Object;
  callBack: ((conversionId: string, to: string) => void) | undefined;
  conversionID: string;
}

export default function MsgItem({
  msg,
  otherStyle,
  callBack,
  conversionID,
  to,
}: Params) {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={[styles.container, otherStyle]}
      onPress={() => callBack && callBack(conversionID, to)}
    >
      <View>
        <Image
          source={{ uri: msg.avatar }}
          style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={styles.textWrapper}>
        <MyText style={styles.from}>{msg.from}</MyText>
        <MyText style={styles.msg}>{msg.msg}</MyText>
      </View>

      {msg.num > 0 && (
        <View style={styles.num}>
          <MyText style={styles.numText}>{msg.num}</MyText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    // backgroundColor: 'orange',
    alignItems: 'center',
    paddingLeft: 6,
    flexDirection: 'row',
  },
  textWrapper: {
    marginLeft: 8,
  },
  from: {
    color: '#6b6b6b',
    fontWeight: '800',
  },
  msg: {
    color: '#acacac',
  },
  num: {
    width: 26,
    height: 26,
    backgroundColor: '#e24f3f',
    position: 'absolute',
    right: 10,
    borderRadius: 36 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // float: 'right',
    // justifyContent: 'flex-end',
  },
  numText: {
    color: '#fff',
    fontSize: 14,
  },
});
