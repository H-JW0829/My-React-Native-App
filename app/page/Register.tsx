import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import { get, post } from '../common/http';
import Screen from './Screen';
import Form from '../component/Form/Form';
import FormField from '../component/Form/FormField';
import SubmitButton from '../component/Form/SubmitButton';
import Button from '../component/Button';
import colors from '../config/colors';
import MyImagePicker from '../component/ImagePicker';
import { userStore } from '../store';

const phoneRegExp = /^1[3|4|5|7|8][0-9]\d{8}$/;

const validationSchema = Yup.object().shape({
  nickname: Yup.string().required().min(1).max(20).label('Nickname'),
  tel: Yup.string()
    .required()
    .matches(phoneRegExp, 'Telephone Number is not valid')
    .label('Telephone'),
  password: Yup.string().required().min(6).max(15).label('Password'),
  confirmPassword: Yup.string().required().min(6).max(15).label('Password'),
});

const width = 300;

function Register({ navigation }: { navigation: { [propName: string]: any } }) {
  const [image, setImage] = useState('');

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { password, tel, confirmPassword, nickname } = values;
        if (password !== confirmPassword) {
          Alert.alert('Error', 'The password entered is not consistent！');
          return;
        }
        const response = await post('/user/register', {
          tel,
          password,
          nickname,
          avatar: image,
        });
        if (response.code === 0) {
          userStore.initUser(response.data);
          const jsonValue = JSON.stringify(response.data);
          await AsyncStorage.setItem('user', jsonValue);
          Alert.alert('Success', 'Login Success');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 1000);
        } else {
          Alert.alert('Error', response.msg || 'Register Error');
        }
      } catch (e) {}
    },
    [navigation, image]
  );

  const handlePick = useCallback(async (image) => {
    const fileName = image.uri.split('/')[-1];
    try {
      const response = await post(
        `http://hn216.api.yesapi.cn/?s=App.CDN.UploadImgByBase64&app_key=5687BCD24AA4D3C1ED073F5C8AC17C6B&sign=wtOVTtR1veX4VVwgSkYMf0Ur9YVHsifAhGl55hbXMrQbwGKWkPmBAEHoo5ydejQncZWI5b&file_name=${fileName}`,
        {
          file:
            'data:image/jpg;base64,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',
        },
        true
      ).catch((e) => {
        throw e;
      });
      // console.log(response);
      if (response.data?.err_code === 0) {
        setImage(response.data?.url);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }, []);

  return (
    <Screen style={styles.container}>
      {/* <Image style={styles.logo} source={require('../assets/app-logo.png')} /> */}
      {/* @ts-ignore */}
      <MyImagePicker callBack={handlePick}></MyImagePicker>
      <Text style={{ fontSize: 12, marginTop: 10, color: '#6d6969' }}>
        Pick an image as your avatar
      </Text>
      <Form
        initialValues={{ tel: '', password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="card-text"
          name="nickname"
          placeholder="Nickname"
          textContentType="nickname"
          width={width}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="tel"
          placeholder="Telephone"
          textContentType="telephoneNumber"
          width={width}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          width={width}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
          width={width}
        />
        <SubmitButton title="Register" otherStyle={{ width }} />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});

export default Register;
