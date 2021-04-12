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

interface Item {
  title: string;
  price: number;
  images: Array<string>;
}

interface Params {
  otherStyle?: Object;
  item: Item;
  handlePress: ((item: Item) => void) | undefined;
}

export default function List({ otherStyle, item, handlePress }: Params) {
  return (
    <View style={[styles.container, otherStyle]}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => handlePress && handlePress(item)}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: '100%', height: otherStyle?.height * 0.67 }}
          resizeMode="contain"
        ></Image>
        <View style={styles.textWrapper}>
          <MyText style={styles.title} numberOfLines={1}>
            {item.title}
          </MyText>
          <MyText style={styles.subTitle} numberOfLines={2}>
            {item.price}
          </MyText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
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
    color: '#62a87c',
  },
});
