/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {IAuthForm} from '../../store/auth/interfaces';
import FormInput from '../../components/FormInput';
import {formSchema} from '../../ultils/formSchema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useAuthFacade} from '../../store/auth/useAuthFacade';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchLanguage from '../../components/SwitchLanguage';
import {useTranslation} from 'react-i18next';

const Login = ({route, navigation}: any) => {
  const {t} = useTranslation();
  const {login, loading, resetStore} = useAuthFacade();
  // const [loading, setLoading] = React.useState(false);
  const {isOnBoarding} = route.params;

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: IAuthForm) => {
    const dataValue = {...data, time: Date.now().toString()};
    login({
      email: data.email,
      password: data.password,
      time: Date.now().toString(),
    });
    showMessage({
      message: 'Success',
      description: 'Login Success',
      type: 'success',
    });
    AsyncStorage.setItem('auth', JSON.stringify(dataValue));
    AsyncStorage.setItem('onBoarding', 'true');
  };

  useEffect(() => {
    resetStore();
  }, [resetStore]);

  return (
    <View style={styles.container}>
      {!isOnBoarding ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            height: 34,
            width: 34,
            borderWidth: 1,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={22}
            color="black"
          />
        </TouchableOpacity>
      ) : null}
      <View style={{position: 'absolute', right: 12, top: 12}}>
        <SwitchLanguage />
      </View>

      <FlashMessage
        hideStatusBar={false}
        statusBarHeight={StatusBar.currentHeight}
        position="top"
      />
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          source={require('../../assets/image/welcom_back.png')}
          style={{
            height: 251,
            width: 226,
          }}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <FormInput
          control={control}
          name="email"
          placeholder="email"
          style={{
            height: 40,
            padding: 10,
            borderRadius: 11,
            backgroundColor: 'white',
          }}
        />
      </View>

      <View>
        <Text style={styles.label}>{t('PASSWORD')}</Text>
        <FormInput
          control={control}
          name="password"
          placeholder={t('ENTER_PASSWORD')}
          style={{
            height: 40,
            padding: 10,
            borderRadius: 11,
            backgroundColor: 'white',
          }}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.7}>
        <View
          style={{
            ...styles.button,
            backgroundColor: loading ? '#55847A' : '#55847A',
          }}>
          {loading && <ActivityIndicator size="large" color="white" />}
          <Text style={styles.buttonText}>
            {loading ? ' Loading' : t('LOGIN')}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 24,
        }}>
        <Text>Dont have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{color: '#55847A'}}>Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
    padding: 8,
    paddingHorizontal: 32,
    backgroundColor: '#EDEDED',
  },
  label: {
    margin: 12,
    marginLeft: 0,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 220,
    height: 44,
    borderWidth: 1,
    borderColor: '#666',
    marginTop: 48,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
