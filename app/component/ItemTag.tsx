import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import MyText from './Form/Text';

interface Params {
  otherStyle?: Object;
  tag: string;
  index: number;
  pressCallback: (index: number) => void;
}

export default function ItemTag({
  otherStyle,
  tag,
  index,
  pressCallback,
}: Params) {
  const handlePress = useCallback(() => {
    pressCallback(index);
  }, [pressCallback]);

  return (
    <TouchableWithoutFeedback
      style={[styles.container, otherStyle]}
      onPress={handlePress}
    >
      <View>
        <MyText style={{ fontSize: 16, color: otherStyle?.color || '#000' }}>
          {tag}
        </MyText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 100,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
