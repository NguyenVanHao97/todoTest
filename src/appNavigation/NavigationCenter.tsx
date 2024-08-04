import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import {useAuthFacade} from '../store/auth/useAuthFacade';
import AuthScreen from '../screens/auth';
import EditTodo from '../screens/edit';

const Stack = createStackNavigator();

const NavigationCenter = () => {
  const {time} = useAuthFacade();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {time ? (
          <>
            <Stack.Screen name="HomeScreen" component={TabNavigator} />
            <Stack.Screen name="edit" component={EditTodo} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={AuthScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationCenter;
