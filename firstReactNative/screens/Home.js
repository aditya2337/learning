import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export function Home({navigation}) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ColorPalette');
        }}>
        <Text>Hello world</Text>
      </TouchableOpacity>
    </View>
  );
}
