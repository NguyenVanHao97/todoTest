import {createWithEqualityFn} from 'zustand/traditional';
import {InitialStateProps, LoginProps} from './interfaces';
import * as Keychain from 'react-native-keychain';

const initialState = {
  user: {email: '', password: '', time: ''},
  loading: false,
  error: '',
  success: false,
  time: '',
  expireLogin: true,
};

const useAuthStore = createWithEqualityFn<InitialStateProps>()(set => {
  const time = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials('accessToken');
      if (credentials) {
        return credentials.toString();
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getUser = async () => {
    const user = await Keychain.getInternetCredentials('user');

    if (user) {
      return user;
    } else {
      return null;
    }
  };

  time().then(timeLogin => {
    set(state => ({
      ...state,
      time: timeLogin?.toString() || null,
      expireLogin:
        Number(Date.now().toString()) - Number(timeLogin?.toString() || '0') >
        2000,
    }));
  });

  getUser().then((userData: LoginProps | any) => {
    set(state => ({...state, user: userData}));
  });

  return {
    ...initialState,
    time,
    resetStore: () => {
      set(state => ({
        ...state,
        loading: false,
        success: false,
        error: null,
        expireLogin: true,
      }));
    },
    login: async ({email, password, time}: LoginProps) => {
      set(state => ({...state, loading: true}));
      Keychain.setInternetCredentials(
        'user',
        'user',
        JSON.stringify({email, password, time}),
      );
      Keychain.setInternetCredentials('accessToken', 'accessToken', time);
      set(state => ({
        ...state,
        error: null,
        success: true,
        user: {email, password, time},
        time: time,
        expireLogin: false,
      }));
    },
    logout: async () => {
      await Keychain.resetInternetCredentials('user');
      await Keychain.resetInternetCredentials('accessToken');
      set(initialState);
    },
  };
});
export default useAuthStore;
