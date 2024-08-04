/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const OnBoardingScreen = (props: any) => {
  const onPressStart = () => {
    props.navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/image_man.png')}
        style={{height: 200, width: 300}}
      />
      <View style={{padding: 20, alignItems: 'center', marginTop: 48}}>
        <Text style={{fontSize: 20}}>Get things done with Todo</Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginTop: 20}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing. Maxime, tempore!
          Animi nemo aut atque, deleniti nihil dolorem repellendus.
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 40,
          backgroundColor: '#55847A',
          height: 44,
          width: 220,
          justifyContent: 'center',
        }}
        activeOpacity={0.7}
        onPress={onPressStart}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontFamily: 'medium',
            textAlign: 'center',
          }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 200,
  },
});
