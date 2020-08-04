import React, {useState, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, Text, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SquareColorBox} from '../components/SquareColorBox';

export function Home({navigation}) {
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchPalettes = useCallback(async () => {
    try {
      const data = await (
        await fetch('https://color-palette-api.kadikraman.now.sh/palettes')
      ).json();
      setPalettes(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchPalettes();
    setIsRefreshing(false);
  }, [fetchPalettes]);

  useEffect(() => {
    fetchPalettes();
  }, [fetchPalettes]);
  return (
    <View>
      <FlatList
        data={palettes}
        keyExtractor={(item) => item.id}
        renderItem={({item: {paletteName, colors}}) => (
          <Colors
            data={colors}
            navigation={navigation}
            paletteName={paletteName}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

function Colors({navigation, data, paletteName}) {
  return (
    <View style={{paddingTop: 10}}>
      <Text>{paletteName}</Text>
      <TouchableOpacity
        style={{paddingTop: 10}}
        onPress={() => {
          navigation.navigate('ColorPalette', {
            paletteName,
            colors: data,
          });
        }}>
        <FlatList
          data={data.slice(0, 5)}
          keyExtractor={({hexCode}) => hexCode}
          ItemSeparatorComponent={() => <View style={{paddingRight: 10}} />}
          horizontal
          renderItem={({item: {hexCode}}) => <SquareColorBox color={hexCode} />}
        />
      </TouchableOpacity>
    </View>
  );
}
