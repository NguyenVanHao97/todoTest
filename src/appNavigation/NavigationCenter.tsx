/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import {useAuthFacade} from '../store/auth/useAuthFacade';
import AuthScreen from '../screens/auth';
import EditTodo from '../screens/edit';
import FlashMessage from 'react-native-flash-message';
import {StatusBar} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import BootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

const NavigationCenter = () => {
  const {expireLogin, loading} = useAuthFacade();

  return (
    <>
      <FlashMessage
        hideStatusBar={false}
        statusBarHeight={StatusBar.currentHeight}
        position="top"
      />
      {loading ? (
        <ActivityIndicator
          style={{alignItems: 'center', alignSelf: 'center', flex: 1}}
          color="#55847A"
          size={30}
        />
      ) : (
        <NavigationContainer
          onReady={() => {
            BootSplash.hide();
          }}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {!expireLogin ? (
              <>
                <Stack.Screen name="HomeScreen" component={TabNavigator} />
                <Stack.Screen name="edit" component={EditTodo} />
              </>
            ) : (
              <>
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default NavigationCenter;