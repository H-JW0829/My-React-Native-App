import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { useObserver, useLocalStore } from 'mobx-react';

import MsgItem from '../component/MsgItem';
import { userStore, conversionStore } from '../store';

export default function MyMessages({ navigation, route }) {
  const deleteConversion = useCallback((row) => {
    conversionStore.deleteConversion(row);
  }, []);
  const [activeRow, setActiveRow] = useState(-1);

  const swipeoutBtns = useMemo(() => {
    return [
      {
        text: 'Delete',
        backgroundColor: '#e85d58',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
          deleteConversion(activeRow);
        },
      },
    ];
  }, [deleteConversion, activeRow]);

  const [me, setMe] = useState({});

  const handleNavigate = useCallback(
    (conversionID, to) => {
      navigation.navigate('Chat', { conversionID, to, from: me });
    },
    [navigation, me]
  );

  useEffect(() => {
    const init = async () => {
      const user = userStore.user;
      await conversionStore.initConversions(user._id);
      // setConversions(conversionStore.conversions);
      setMe(user);
    };
    init();
  }, []);

  const onSwipeOpen = useCallback((rowId, direction) => {
    if (typeof direction !== 'undefined') {
      setActiveRow(rowId);
    }
  }, []);

  const renderItem = ({ item, index }) => {
    const user = item.producer._id === me._id ? item.consumer : item.producer;
    const num =
      item.producer._id === me._id ? item.producerUnread : item.consumerUnread;
    // console.log(user);
    const msg = {
      avatar: user.avatar,
      from: user.nickname,
      msg: item.lastMessage.text,
      num,
    };

    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose={true}
        backgroundColor="transparent"
        rowID={index}
        sectionId={1}
        onOpen={(secId, rowId, direction) => onSwipeOpen(rowId, direction)}
        close={activeRow !== index}
      >
        <MsgItem
          msg={msg}
          conversionID={item._id}
          otherStyle={{ marginTop: 10 }}
          callBack={handleNavigate}
          to={user}
        ></MsgItem>
      </Swipeout>
    );
  };

  return useObserver(() => (
    <View style={styles.container}>
      <FlatList
        data={conversionStore.conversions}
        renderItem={renderItem}
        //   @ts-ignore
        keyExtractor={(item, index) => item._id}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
