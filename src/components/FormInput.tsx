import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';

interface Props {
  control: any;
  name: string;
  [key: string]: any;
}
const FormInput = (props: Props) => {
  const {control, name, ...otherParams} = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherParams}
          />
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
export default FormInput;
