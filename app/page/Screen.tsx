import React, { ReactNode } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View } from 'react-native';

interface Params {
  children: ReactNode;
  style?: Object;
}

function Screen({ children, style }: Params) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    // backgroundColor: 'gold',
  },
  view: {
    flex: 1,
    // backgroundColor: 'lightblue',
  },
});

export default Screen;
