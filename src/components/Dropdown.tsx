/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Controller} from 'react-hook-form';

interface Props {
  label: string;
  data: string[];
  control: any;
  name: string;
  [key: string]: any;
}
const Dropdown: FC<Props> = ({label, data, control, name, ...otherParam}) => {
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);

  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const renderDropdown = () => {
    if (visible) {
      return (
        <Controller
          control={control}
          name={name}
          render={({field: {onChange}}) => (
            <View style={styles.dropdown}>
              {data.map((item, index) => {
                const lastItem = data[data.length - 1];
                return (
                  <TouchableOpacity
                    key={`${index}_${item}`}
                    style={{
                      flex: 1,
                      width: '100%',
                      paddingVertical: 12,
                      borderBottomWidth: item === lastItem ? 0 : 1,
                      borderColor: 'gray',
                    }}
                    onPress={() => {
                      setSelectedLabel(item);
                      setVisible(false);
                      onChange(item);
                    }}>
                    <Text style={{textAlign: 'center'}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />
      );
    }
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <Text>{name}</Text>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[styles.button]}
        {...otherParam}>
        {renderDropdown()}
        <Text style={styles.buttonText}>{selectedLabel}</Text>
        <MaterialCommunityIcons name="chevron-down" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    // width: '90%',
    zIndex: 1,
    marginBottom: 100,
  },
  buttonText: {
    // flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
    width: 100,
    zIndex: 999,
  },
});
