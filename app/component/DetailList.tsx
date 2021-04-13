import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import MyText from '../component/Form/Text';
import colors from '../config/colors';

interface Params {
  item: {
    [propName: string]: any;
  };
  otherStyle?: {
    [propName: string]: any;
  };
  desc?: string;
}

export default function DetailList({ item, otherStyle, desc }: Params) {
  return (
    <View style={[styles.container, otherStyle]}>
      <Image
        source={{ uri: item.images[0] }}
        style={{ width: '100%', height: otherStyle?.height * 0.67 || 250 }}
        resizeMode="contain"
      ></Image>
      <MyText style={styles.title} numberOfLines={1}>
        {item.title}
      </MyText>
      <MyText style={styles.subTitle} numberOfLines={2}>
        {item.price}
      </MyText>
      {item.desc && <MyText style={styles.desc}>{item.desc}</MyText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // borderRadius: 12,
    paddingLeft: 10,
    paddingBottom: 10,
    // overflow: 'hidden',
    // flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  textWrapper: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    fontWeight: '500',
  },
  subTitle: {
    color: '#e18086',
    marginTop: 15,
  },
  desc: {
    marginTop: 10,
  },
});
