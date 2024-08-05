import {ReactNode} from 'react';
import React, {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

const DismissKeyboard = ({children}: {children: ReactNode}) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
    }}>
    <View>{children}</View>
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
