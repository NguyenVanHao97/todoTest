import {shallow} from 'zustand/shallow';
import useAuthStore from './useAuthStore';

export const useAuthFacade = () => {
  const {
    user,
    loading,
    error,
    success,
    login,
    logout,
    resetStore,
    time,
    expireLogin,
  } = useAuthStore(
    state => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      login: state.login,
      success: state.success,
      resetStore: state.resetStore,
      time: state.time,
      logout: state.logout,
      expireLogin: state.expireLogin,
    }),
    shallow,
  );

  return {
    user,
    loading,
    error,
    success,
    login,
    resetStore,
    time,
    logout,
    expireLogin,
  };
};
