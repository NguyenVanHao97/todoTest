/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedScreen from '../screens/feed';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ITodo} from '../store/todo/interfaces';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          const id = new Date().getTime();
          const item: ITodo = {
            name: '',
            status: 'pending',
            executionTime: {date: id, time: id},
            title: 'Others',
            priority: 'low',
            isSelected: false,
            id: id.toString(),
            lastUpdate: id,
            des: '',
          };
          navigation.navigate('edit', {item, type: 'CREATE'});
        }}
        activeOpacity={0.7}
        style={styles.btnCreate}>
        <MaterialCommunityIcons name="plus" color="white" size={40} />
      </TouchableOpacity>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}: {color: string}) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={26}
                onPress={() => console.log('Home')}
              />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({color}: {color: string}) => (
              <MaterialCommunityIcons
                name="format-list-checkbox"
                color={color}
                size={26}
              />
            ),
          }}
          name="Feed"
          component={FeedScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}: {color: string}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  btnCreate: {
    position: 'absolute',
    right: 50,
    bottom: 100,
    zIndex: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#55847A',
  },
});

export default TabNavigator;
