import {createWithEqualityFn} from 'zustand/traditional';
import {InitialStateProps, LoginProps} from './interfaces';
import * as Keychain from 'react-native-keychain';

const initialState = {
  user: {email: '', password: '', time: ''},
  loading: false,
  expireLogin: true,
};

const useAuthStore = createWithEqualityFn<InitialStateProps>()(set => {
  const getUser = async () => {
    set(state => ({...state, loading: true}));
    try {
      const user = await Keychain.getInternetCredentials('user');
      if (user) {
        const userData = JSON.parse(user.password);
        const expireLogin =
          userData.time < new Date().getTime() - 10 * 60 * 1000;
        set(state => ({...state, user: userData, expireLogin, loading: false}));
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Failed to retrieve user credentials:', error);
      return null;
    }
  };
  getUser();

  return {
    ...initialState,
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
      try {
        await Keychain.setInternetCredentials(
          'user',
          'user',
          JSON.stringify({email, password, time}),
        );
        setTimeout(() => {
          set(state => ({
            ...state,
            error: null,
            success: true,
            user: {email, password, time},
            time: time,
            expireLogin: false,
            loading: false,
          }));
        }, 2000);
      } catch (error) {
        console.error('Login failed:', error);
        set(state => ({...state, loading: false, error: error}));
      }
    },
    logout: async () => {
      set(state => ({...state, loading: true}));
      try {
        await Keychain.resetInternetCredentials('user');
        await Keychain.resetInternetCredentials('accessToken');
        setTimeout(() => {
          set(initialState);
        }, 2000);
      } catch (error) {
        console.error('Logout failed:', error);
        set(state => ({...state, loading: false, error: error}));
      }
    },
    // expireLogin: false,
  };
});
export default useAuthStore;
