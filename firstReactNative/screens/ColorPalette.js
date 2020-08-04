import React from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, View} from 'react-native';
import ColorBox from '../components/ColorBox';

export default function ColorPalette({route}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{route.params.paletteName}</Text>
      <View style={{ paddingTop: 10 }}>
        <FlatList
          data={route.params.colors}
          renderItem={({item: {colorName, hexCode}}) => (
            <ColorBox color={hexCode} label={colorName} />
          )}
          keyExtractor={({hexCode}) => hexCode}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // flex: 1,
  },
});
