/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, View} from 'react-native';
import ColorBox from './components/ColorBox';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello world</Text>
      <View>
        <FlatList
          data={COLORS}
          renderItem={({item: {colorName, hexCode}}) => (
            <ColorBox color={hexCode} label={colorName} />
          )}
          keyExtractor={({hexCode}) => hexCode}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // flex: 1,
  },
});

const COLORS = [
  {colorName: 'Base03', hexCode: '#002b36'},
  {colorName: 'Base02', hexCode: '#073642'},
  {colorName: 'Base01', hexCode: '#586e75'},
  {colorName: 'Base00', hexCode: '#657b83'},
  {colorName: 'Base0', hexCode: '#839496'},
  {colorName: 'Base1', hexCode: '#93a1a1'},
  {colorName: 'Base2', hexCode: '#eee8d5'},
  {colorName: 'Base3', hexCode: '#fdf6e3'},
  {colorName: 'Yellow', hexCode: '#b58900'},
  {colorName: 'Orange', hexCode: '#cb4b16'},
  {colorName: 'Red', hexCode: '#dc322f'},
  {colorName: 'Magenta', hexCode: '#d33682'},
  {colorName: 'Violet', hexCode: '#6c71c4'},
  {colorName: 'Blue', hexCode: '#268bd2'},
  {colorName: 'Cyan', hexCode: '#2aa198'},
  {colorName: 'Green', hexCode: '#859900'},
];

export default App;
