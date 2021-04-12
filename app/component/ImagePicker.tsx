import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNFS from 'react-native-fs';

interface Params {
  otherStyle?: Object;
  callBack?: (a: Object) => boolean;
}

function MyImagePicker({ otherStyle, callBack, ...otherProps }: Params) {
  const [image, setImage] = useState<string | null>(null);

  const getPermission = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    }
    return true;
  }, []);

  const pickImage = useCallback(async () => {
    const flag = getPermission();
    if (!flag) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: otherProps.isBase64 ? true : false,
    });
    if (!result.cancelled) {
      if (callBack) {
        const isShow = await callBack(result);
        if (isShow) {
          setImage(result.uri);
        }
      } else {
        setImage(result.uri);
      }
    }
  }, [getPermission]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.imageWrapper, otherStyle]}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.avatar, otherStyle?.image]}
          />
        ) : (
          <Image
            source={require('../assets/avater-picker.png')}
            style={[styles.image, otherStyle?.defaultImage]}
          ></Image>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    borderWidth: 3,
    width: 170,
    height: 170,
    borderColor: 'lightgrey',
    borderRadius: 170 / 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 140,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
  },
});

export default MyImagePicker;
