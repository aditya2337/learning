import React from 'react';
import {View, StyleSheet} from 'react-native';

export function SquareColorBox({color}) {
  return (
    <View style={{...style, shadowColor: '#000', backgroundColor: color}} />
  );
}

const style = StyleSheet.create({
  height: 20,
  width: 20,
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.3,
  shadowRadius: 1,
  elevation: 2,
});
