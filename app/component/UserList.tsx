import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import MyText from './Form/Text';

interface Item {
  icon: { name: string; color: string; size: number };
  title: string;
  path?: string;
}

interface Params {
  userLists?: Array<Item>;
  otherStyle?: Object;
  handlePress: (item: Item) => void;
}

export default function UserList({
  userLists,
  otherStyle,
  handlePress,
}: Params) {
  return (
    <View style={[styles.container, otherStyle]}>
      {userLists?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.wrapper}
            onPress={() => handlePress(item)}
          >
            <MaterialCommunityIcons
              name={item.icon.name}
              size={item.icon.size || 24}
              color={item.icon.color}
            />
            <MyText style={styles.title}>{item.title}</MyText>
            <AntDesign
              name="right"
              size={24}
              color="#8c8c8c"
              style={styles.right}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
  },
  wrapper: {
    flexDirection: 'row',
    height: 70,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 15,
    // backgroundColor: 'tomato',
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
  },
  right: {
    position: 'absolute',
    right: 0,
  },
});
