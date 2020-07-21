import React from 'react';
import {View, Text} from 'react-native';

export default function ColorBox({label, color}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: color,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <Text>{label}</Text>
    </View>
  );
}
