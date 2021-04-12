import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

import List from '../component/List';
import ItemTag from '../component/ItemTag';
import { get, post } from '../common/http';
import { useGetCategory } from '../common/hooks';

const Data = [
  {
    id: 1,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 2,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 3,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 4,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 5,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 6,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 7,
    image: require('../assets/cake.png'),
    title: 'cake',
    subTitle: '$99',
  },
  {
    id: 8,
    image: require('../assets/cake.png'),
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

export default function Business({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  //   const [categories, setCategories] = useState([]);
  const [LIST, setLIST] = useState([]);
  const categories = useGetCategory();

  const handlePress = useCallback((item) => {
    navigation.navigate('ItemDetail', { item });
  }, []);

  const getAllList = useCallback(async () => {
    const response = await get('/list/getAll');
    if (response.code === 0) {
      setList(response.data.lists);
      setLIST(response.data.lists);
    }
  }, []);

  useEffect(() => {
    // const getAllCategory = async () => {
    //   const response = await get('/category/getAll');
    //   if (response.code === 0) {
    //     setCategories(response.data.categories);
    //   }
    // };
    getAllList();
    // getAllCategory();
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
      const res = LIST.filter((item) => {
        return item.category._id === category._id;
      });
      //   console.log(res);
      setList(res);
    },
    [categories, LIST]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllList();
    setTimeout(() => {
      handleActive(activeIndex);
      setRefreshing(false);
    }, 500);
  }, [getAllList, activeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.tagWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => {
            return (
              <ItemTag
                key={index}
                tag={category?.title}
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
          keyExtractor={(item) => item?._id}
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
