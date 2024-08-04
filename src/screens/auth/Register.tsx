import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Register = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button title="goback" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {},
});
