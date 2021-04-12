import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import Icon from './Icon';
import MyText from './Form/Text';

interface Params {
  item: {
    icon: string;
    title: string;
    backgroundColor: string;
  };
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

function CategoryPickerItem({ item, onPress }: Params) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item?.backgroundColor}
          name={item?.icon}
          size={80}
        />
      </TouchableOpacity>
      <MyText style={styles.label}>{item?.title}</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
    width: '33%',
  },
  label: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CategoryPickerItem;
