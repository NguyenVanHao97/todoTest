import React, {useEffect, useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import OnBoardingScreen from './onBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const AuthScreen = () => {
  const [isOnBoarding, setIsOnBoarding] = useState(false);
  const initScreen = useMemo(() => {
    return isOnBoarding ? 'LoginScreen' : 'onboarding';
  }, [isOnBoarding]);

  useEffect(() => {
    const getStatusOnboarding = async () => {
      try {
        const onBoardingValue = await AsyncStorage.getItem('onBoarding');
        if (onBoardingValue === 'true') {
          setIsOnBoarding(true);
        } else {
          setIsOnBoarding(false);
        }
      } catch (error) {
        console.error('Error fetching onboarding status:', error);
      }
    };
    getStatusOnboarding();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        initialParams={{isOnBoarding}}
      />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen name="onboarding" component={OnBoardingScreen} />
    </Stack.Navigator>
  );
};

export default AuthScreen;
