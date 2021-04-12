import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

import MyText from './Form/Text';

interface Item {
  title: string | undefined;
}

interface Params {
  item: Item;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

function PickItem({ item, onPress }: Params) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MyText style={styles.text}>{item?.title}</MyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickItem;
