import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import List from '../component/List';
import ItemTag from '../component/ItemTag';
import { post } from '../common/http';
import { useGetCategory } from '../common/hooks';

const Data = [
  {
    id: 1,
    images: [
      'http://cd7.yesapi.net/5687BCD24AA4D3C1ED073F5C8AC17C6B_20210407212018_b4059f14c96830cdcda621f5beed0b60.jpg',
    ],
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 2,
    images: [
      'http://cd7.yesapi.net/5687BCD24AA4D3C1ED073F5C8AC17C6B_20210407212018_b4059f14c96830cdcda621f5beed0b60.jpg',
    ],
    title: 'cake',
    subTitle: '$99',
  },
];

const Tags = [
  'Book',
  'Fruit',
  'Vegetable',
  'Computer',
  'Book',
  'Fruit',
  'Vegetable',
  'Computer',
];
export default function MyListings({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const categories = useGetCategory();
  const [list, setList] = useState([]);
  const [LIST, setLIST] = useState([]);

  const handlePress = useCallback((item) => {
    navigation.navigate('ItemDetail', { item });
  }, []);

  useEffect(() => {
    const init = async () => {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);

      const getMyList = async () => {
        const response = await post('/list/getMyList', {
          user: user._id,
        });
        if (response.code === 0) {
          setList(response.data.lists);
          setLIST(response.data.lists);
        }
        // console.log(response.data);
      };
      getMyList();
    };
    init();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <List
        otherStyle={{
          width: '95%',
          height: 250,
          alignSelf: 'center',
          marginBottom: 25,
        }}
        handlePress={handlePress}
        item={item}
      ></List>
    );
  };

  const handleActive = useCallback(
    (index) => {
      setActiveIndex(index);
      const category = categories[index];
      //   console.log(category);
      //   console.log(LIST);
      const res = LIST.filter((item) => {
        return item.category === category._id;
      });
      //   console.log(res);
      setList(res);
    },
    [categories, LIST]
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tagWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((tag, index) => {
            return (
              <ItemTag
                key={tag._id}
                tag={tag?.title}
                index={index}
                otherStyle={{
                  marginLeft: 8,
                  marginRight: 8,
                  backgroundColor: `${
                    index === activeIndex ? '#86d6c5' : '#fff'
                  }`,
                  color: `${index === activeIndex ? '#fff' : '#000'}`,
                }}
                pressCallback={handleActive}
              ></ItemTag>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={list}
          renderItem={renderItem}
          //   @ts-ignore
          keyExtractor={(item) => item._id}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  listWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  tagWrapper: {
    // flexDirection: 'row',
    height: 50,
    width: '100%',
    // alignItems: 'center',
    // backgroundColor: 'tomato',
  },
  scrollViewStyle: {
    flexDirection: 'row',
    backgroundColor: 'gold',
  },
});
