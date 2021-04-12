import React, { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Screen from './Screen';
import DetailList from '../component/DetailList';
import UserHeader from '../component/UserHeader';
import MyText from '../component/Form/Text';

interface Params {
  route: {
    params: Object;
  };
  navigation: Object;
}

function Detail({ route, navigation }: Params) {
  const [refreshing, setRefreshing] = useState(false);
  const { item } = route.params;
  //   console.log(item);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  const handleContact = useCallback(async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user._id === item.user._id) return;
    navigation.navigate('Chat', {
      to: item.user,
      from: user,
    });
  }, []);

  return (
    <Screen style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DetailList item={item} otherStyle={{ paddingBottom: 30 }}></DetailList>
        <UserHeader user={item.user}></UserHeader>
        {/* <View style={styles.buttonWrapper}> */}
        <TouchableOpacity onPress={handleContact} style={styles.button}>
          <MyText style={{ color: '#fff' }}>Contact Seller</MyText>
        </TouchableOpacity>
        {/* </View> */}
        <View style={styles.mapWrapper}>
          <MapView
            // initialRegion={{
            //   latitude: 37.78825,
            //   longitude: -122.4324,
            //   latitudeDelta: 0.0922,
            //   longitudeDelta: 0.0421,
            // }}
            style={styles.map}
            showsUserLocation={true}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  detailListWrapper: {
    // backgroundColor: 'red',
    // height: 300,
  },
  buttonWrapper: {
    height: 100,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#d85b73',
    alignItems: 'center',
    height: 60,
    width: '90%',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  mapWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 400,
  },
});

export default Detail;
