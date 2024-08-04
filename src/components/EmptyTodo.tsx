/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const EmptyTodo = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/empty.png')}
        style={{
          height: 400,
          width: 300,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          marginVertical: 12,
          color: '#55847A',
          fontWeight: 'bold',
        }}>
        {t('EMPTY_ACTIVITY')}
      </Text>
      <Text style={{textAlign: 'center', fontSize: 18, color: '#55847A'}}>
        Hãy note lại hoạt động của mình để ghi nhớ nhé!
      </Text>
    </View>
  );
};

export default EmptyTodo;

const styles = StyleSheet.create({
  container: {marginTop: 24, alignContent: 'center', alignSelf: 'center'},
});
