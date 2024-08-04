import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import NavigationCenter from './src/appNavigation/NavigationCenter';
import './i18n.config';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationCenter />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
