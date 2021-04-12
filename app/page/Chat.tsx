import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useObserver, useLocalStore } from 'mobx-react';

import ChatItem from '../component/ChatItem';
// import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from './Screen';
import MyText from '../component/Form/Text';
import { sendMsg, socket } from '../common/utils';
import { get, post } from '../common/http';
import { userStore, msgStore, conversionStore } from '../store';

function Chat({ navigation, route }) {
  const [text, onChangeText] = useState('');
  // const localStore = useLocalStore(() => msgStore);

  const sendMessage = useCallback(async () => {
    const { to, from } = route.params;
    sendMsg({ from: from._id, to: to._id, content: text });
    onChangeText('');
  }, [text]);

  useEffect(() => {
    const init = async () => {
      const { params } = route;
      if (params.conversionID) {
        await msgStore.initMsgs({
          conversionID: params.conversionID,
          method: 1,
        });
        // setMsgs(msgStore.msgs);
      } else {
        await msgStore.initMsgs({
          from: params.from._id,
          to: params.to._id,
          method: 2,
        });
        // setMsgs(msgStore.msgs);
      }
    };
    init();

    return async () => {
      const response = await post('/conversion/reset', {
        conversionID: msgStore.conversionID,
        user: route.params.from?._id,
      });
      if (response.code === 0) {
        conversionStore.resetConversion(response.data.conversion);
      }
    };
  }, []);

  const renderItem = ({ item }) => {
    const isMe = item.from._id === userStore.user._id ? true : false;
    return (
      <ChatItem
        avatar={item.from.avatar}
        text={item.text}
        isMe={isMe}
      ></ChatItem>
    );
  };
  return useObserver(() => {
    return (
      <Screen style={styles.container}>
        <FlatList
          data={msgStore.msgs}
          renderItem={renderItem}
          //   @ts-ignore
          keyExtractor={(item) => item?._id}
          style={{ width: '100%', marginBottom: 45 }}
          showsVerticalScrollIndicator={false}
          inverted={true}
          // refreshing={refreshing}
          // onRefresh={handleRefresh}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText(text)}
            value={text}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <MyText style={{ fontSize: 14 }}>send</MyText>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 44,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    // width: '100%',
    backgroundColor: '#fff',
    flex: 10,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    width: '100%',
    flexDirection: 'row',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
