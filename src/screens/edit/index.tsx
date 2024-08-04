/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useForm, Controller} from 'react-hook-form';
import FormInput from '../../components/FormInput';
import useStoreTodo from '../../store/todo/useStore';
import Dropdown from '../../components/Dropdown';
import {PRIORITY, STATUS, TITLE} from '../../contants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ITodo} from '../../store/todo/interfaces';
import {RouteProp, useRoute} from '@react-navigation/native';
import {formSchemaEdit} from '../../ultils/formSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import RNCalendarEvents, {Calendar} from 'react-native-calendar-events';

interface ParamList {
  [key: string]: {
    item: ITodo;
    type: string;
  };
}

const convertToDate = (date: number) => {
  return new Date(date).toLocaleDateString('en-US');
};
const convertToTime = (date: number) => {
  return new Date(date).toLocaleTimeString('en-US');
};
const convertToInValidDate = (mil: number) => {
  return new Date(mil);
};

const EditTodo = ({navigation}: any = {}) => {
  const editTodo = useStoreTodo((state: {editTodo: any}) => state.editTodo);
  const createNew = useStoreTodo(state => state.createNewTodo);
  const route = useRoute<RouteProp<ParamList, 'ItemScreen'>>();
  const [pickedCal, setPickedCal] = useState<Calendar | undefined>(undefined);
  const {item, type} = route.params;
  const {
    name = '',
    status = 'pending',
    title = 'Others',
    priority = 'low',
  } = item;
  const isCreateBtn = type === 'CREATE';

  console.log('>>>item', item);

  const id = new Date().getTime();
  const {setValue, control, handleSubmit} = useForm({
    defaultValues: isCreateBtn
      ? {
          ...item,
        }
      : {
          name: name,
          status: status,
          executionTime: item.executionTime,
          title: title,
          priority: priority,
          isSelected: false,
          id: item.id,
          lastUpdate: item.lastUpdate,
          des: item.des,
        },
    resolver: zodResolver(formSchemaEdit),
  });
  const dateValue = new Date();
  const [date, setDate] = useState({
    date: item.executionTime.date,
    hour: item.executionTime.time,
  });

  const [openCalenderDate, setOpenCalenderDate] = useState(false);
  const [openCalenderTime, setOpenCalenderTime] = useState(false);

  const onSubmit = async (data: ITodo) => {
    setTimeout(async () => {
      const dateTime = new Date().getTime();
      console.log('>>>pickedCal?.id ', pickedCal?.id);
      if (isCreateBtn) {
        createNew({...data, lastUpdate: dateTime});
        try {
          await RNCalendarEvents.saveEvent(data.name, {
            calendarId: Platform.OS === 'android' ? pickedCal?.id : undefined,
            // calendarId:data.id.toString()
            startDate: new Date(data.executionTime.date).toISOString(),
            endDate: new Date(data.executionTime.date).toISOString(),
            notes: data.des,
            description: data.des,
          }).then(() => {
            // Alert.alert('save event success');
            console.log('save event success');
          });
        } catch (error) {
          console.log('Error while saving event:', error);
        }
      } else {
        editTodo(data.id, {...data, lastUpdate: dateTime});
      }
      navigation.goBack();
    }, 1000);
  };

  useEffect(() => {
    async function loadCalendars() {
      try {
        const perms = await RNCalendarEvents.requestPermissions();
        if (perms === 'authorized') {
          const allCalendars = await RNCalendarEvents.findCalendars();
          const primaryCal = allCalendars.find(
            cal => cal.isPrimary && cal.allowsModifications,
          );
          setPickedCal(primaryCal);
        } else {
          console.log('Calendar permission denied.');
        }
      } catch (error) {
        console.log('Error while fetching calendars:', error);
      }
    }

    if (Platform.OS === 'android') {
      loadCalendars();
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.iconBack}
        activeOpacity={0.7}
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={22}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <Text style={{fontWeight: '600', fontSize: 20, color: 'black'}}>
            Thời gian thực hiện
          </Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <TouchableOpacity
              style={{flexDirection: 'row', marginRight: 12}}
              onPress={() => {
                setOpenCalenderDate(true);
              }}>
              <Text>{convertToDate(date.date)}</Text>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                style={{marginLeft: 6}}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                setOpenCalenderTime(true);
              }}>
              <Text>{convertToTime(date.hour)}</Text>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                style={{marginLeft: 6}}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          <FormInput
            control={control}
            name="name"
            placeholder="name"
            style={{
              height: 40,
              padding: 10,
              borderRadius: 11,
              backgroundColor: 'white',
              marginBottom: 12,
              marginTop: 24,
            }}
          />
          <FormInput
            control={control}
            name="des"
            placeholder="des"
            returnKeyType={'done'}
            maxLength={200}
            multiline={true}
            style={{
              height: 40,
              padding: 10,
              borderRadius: 11,
              backgroundColor: 'white',
              marginBottom: 12,
              marginTop: 24,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Dropdown
              label={item.title}
              data={TITLE}
              control={control}
              name="title"
              style={styles.dropdown}
            />
            <Dropdown
              label={item.status}
              data={STATUS}
              control={control}
              name="status"
              style={styles.dropdown}
            />
            <Dropdown
              label={item.priority}
              data={PRIORITY}
              control={control}
              name="priority"
              style={styles.dropdown}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={{color: '#ffffff'}}>
            {isCreateBtn ? 'Tạo mới' : 'Sửa'}
          </Text>
        </TouchableOpacity>
        {openCalenderTime ? (
          <Controller
            control={control}
            name="executionTime.time"
            render={({field: {onChange}}) => (
              <DateTimePicker
                mode="time"
                value={convertToInValidDate(item.executionTime.time)}
                onChange={e => {
                  setOpenCalenderTime(false);
                  setDate(prev => ({
                    ...prev,
                    hour: e.nativeEvent.timestamp,
                  }));
                  onChange(e.nativeEvent.timestamp);
                }}
              />
            )}
          />
        ) : null}
        {openCalenderDate ? (
          <Controller
            control={control}
            name="executionTime.date"
            render={({field: {onChange}}) => (
              <DateTimePicker
                mode="date"
                value={convertToInValidDate(item.executionTime.date)}
                onChange={e => {
                  setOpenCalenderDate(false);
                  setDate(prev => ({
                    ...prev,
                    date: e.nativeEvent.timestamp,
                  }));
                  onChange(e.nativeEvent.timestamp);
                }}
              />
            )}
          />
        ) : null}
      </View>
    </>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginVertical: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  errorMessage: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 220,
    height: 44,
    backgroundColor: '#55847A',
    marginTop: 48,
    alignSelf: 'center',
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    borderColor: 'gray',
  },
  iconBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 34,
    width: 34,
    borderWidth: 1,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
});
