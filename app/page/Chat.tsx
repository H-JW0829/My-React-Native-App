import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useObserver } from 'mobx-react';

import ChatItem from '../component/ChatItem';
import Screen from './Screen';
import MyText from '../component/Form/Text';
import { sendMsg } from '../common/utils';
import { post } from '../common/http';
import { userStore, msgStore, conversionStore } from '../store';

interface Params {
  navigation: {
    [propName: string]: any;
  };
  route: {
    [propName: string]: any;
  };
}

function Chat({ navigation, route }: Params) {
  const [text, onChangeText] = useState('');

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

    return () => {
      const resetConversion = async () => {
        const response = await post('/conversion/reset', {
          conversionID: msgStore.conversionID,
          user: route.params.from?._id,
        });
        if (response.code === 0) {
          conversionStore.resetConversion(response.data.conversion);
        }
      };
      resetConversion();
    };
  }, []);

  const renderItem = ({
    item,
  }: {
    item: { from: { [propName: string]: any }; text: string };
  }) => {
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
