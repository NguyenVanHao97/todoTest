import {shallow} from 'zustand/shallow';
import useAuthStore from './useAuthStore';

export const useAuthFacade = () => {
  const {user, loading, login, logout, resetStore, expireLogin} = useAuthStore(
    state => ({
      user: state.user,
      loading: state.loading,
      login: state.login,
      resetStore: state.resetStore,
      logout: state.logout,
      expireLogin: state.expireLogin,
    }),
    shallow,
  );

  return {
    user,
    loading,
    login,
    resetStore,
    logout,
    expireLogin,
  };
};
