/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ITodo} from '../../store/todo/interfaces';
import useStoreTodo from '../../store/todo/useStore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {bgTagPriority, bgTagStatus, bgTagTitle} from '../../ultils/ultil';
import {useAuthFacade} from '../../store/auth/useAuthFacade';
import RNCalendarEvents, {Calendar} from 'react-native-calendar-events';
import EmptyTodo from '../../components/EmptyTodo';
import {useTranslation} from 'react-i18next';
const HomeScreen = (props: any) => {
  const {t} = useTranslation();
  const {user} = useAuthFacade();
  const todos = useStoreTodo((state: {todos: ITodo[]}) => state.todos);
  const deleteTodo = useStoreTodo(
    (state: {deleteTodo: any}) => state.deleteTodo,
  );
  const selectCurrentTodo = useStoreTodo(
    (state: {selectCurrentTodo: any}) => state.selectCurrentTodo,
  );

  // const [calendars, setCalendars] = useState<Calendar[]>([]);
  // const [pickedCal, setPickedCal] = useState<Calendar | undefined>(undefined);

  const renderItem = ({item, index}: {item: ITodo; index: number}) => (
    <View
      style={{
        borderWidth: 1,
        marginBottom: 12,
        borderColor: item.isSelected ? '#EB2F96' : '#D4D4D4',
        borderRadius: 11,
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              height: 20,
              width: 20,
              marginRight: 12,
              borderColor: item.isSelected ? '#EB2F96' : '#D4D4D4',
            }}
            onPress={() => selectCurrentTodo(item.id)}
          />
          <View style={{backgroundColor: bgTagTitle(item)}}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                fontWeight: 'bold',
                paddingVertical: 2,
                paddingHorizontal: 6,
              }}>
              {item.title}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            marginRight: 6,
            fontSize: 16,
            color: 'black',
          }}
          key={`${index}_${item.id}`}>
          {item.name}
        </Text>
        <View style={{marginTop: 12}}>
          <Text style={{color: 'black'}}>Thời gian thực hiện</Text>
          <Text style={{marginVertical: 4}}>
            {new Date(item.executionTime.date).toLocaleDateString()}{' '}
            {new Date(item.executionTime.time).toLocaleTimeString()}
          </Text>
        </View>
        <View>
          <Text style={{color: 'black'}}>{t('LAST_UPDATE')}</Text>
          <Text style={{marginVertical: 4}}>
            {new Date(item.lastUpdate).toLocaleString()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // alignContent: 'flex-end',
        }}>
        <View
          style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              style={{marginRight: 10}}
              onPress={() => {
                deleteTodo(item.id);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              onPress={() => {
                props.navigation.navigate('edit', {item});
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>{t('STATUS')}</Text>
          <View
            style={{
              backgroundColor: bgTagStatus(item),
              borderRadius: 12,
              alignSelf: 'center',
              marginTop: 6,
            }}>
            <Text
              style={{
                marginVertical: 2,
                marginHorizontal: 8,
                color: 'white',
                textAlign: 'center',
              }}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>{t('PRIORITY')}</Text>
          <View
            style={{
              borderRadius: 41,
              backgroundColor: bgTagPriority(item),
              marginTop: 6,
            }}>
            <Text
              style={{
                marginVertical: 4,
                marginHorizontal: 19,
                color: 'white',
                textAlign: 'center',
              }}>
              {item.priority}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
        {t('HELLO')}! {user?.email}
      </Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 10}}
        ListEmptyComponent={<EmptyTodo />}
      />
      <Text>{t('CANCEL')}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {marginTop: 24, flex: 1, marginHorizontal: 24},
});
