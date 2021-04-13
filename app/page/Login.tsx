import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Screen from './Screen';
import Form from '../component/Form/Form';
import FormField from '../component/Form/FormField';
import SubmitButton from '../component/Form/SubmitButton';
import Button from '../component/Button';
import colors from '../config/colors';
import { get, post } from '../common/http';
import { userStore } from '../store';

const phoneRegExp = /^1[3|4|5|7|8][0-9]\d{8}$/;

const validationSchema = Yup.object().shape({
  tel: Yup.string()
    .required()
    .matches(phoneRegExp, 'Telephone Number is not valid')
    .label('Telephone'),
  password: Yup.string().required().min(6).label('Password'),
});

const width = 300;

interface Params {
  navigation: {
    [propName: string]: any;
  };
}

export default function Login({ navigation }: Params) {
  const handleLogin = useCallback(
    async (values) => {
      const { tel, password } = values;
      const response = await post('/user/login', { tel, password });
      if (response.code === 0) {
        userStore.initUser(response.data);
        const jsonValue = JSON.stringify(response.data);
        await AsyncStorage.setItem('user', jsonValue);
        Alert.alert('Success', 'Login Success');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      } else {
        Alert.alert('Error', response.msg || 'Login Error');
      }
    },
    [navigation]
  );

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/app-logo.png')} />
      {/* @ts-ignore */}
      <Form
        initialValues={{ tel: '18822917378', password: '11111111' }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
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
        <SubmitButton title="Login" otherStyle={{ width }} />
      </Form>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        otherStyle={{ width, backgroundColor: colors.registerBtn }}
      ></Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  logo: {
    width: 170,
    height: 170,
    alignSelf: 'center',
  },
});
