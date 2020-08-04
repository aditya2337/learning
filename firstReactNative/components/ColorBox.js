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
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowColor: '#000',
        elevation: 2,
      }}>
      <Text>{label}</Text>
    </View>
  );
}
