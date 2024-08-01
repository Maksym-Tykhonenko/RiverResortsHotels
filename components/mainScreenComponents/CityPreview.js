import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {useContext} from 'react';
import {HotelsContext} from '../../store/hotels_context';
import { COLORS } from '../../constant/colors';

const CityPreview = ({navigation}) => {
  const hotelsCtx = useContext(HotelsContext);
  const allCitiesData = hotelsCtx.allHotelsData;
  const cities = Object.keys(allCitiesData);

  function renderCites(itemData) {
    const currentCityDataImage = allCitiesData[itemData.item].cityImage

    function pressHandle() {
      navigation.navigate('CityHotels', {
        cityName: itemData.item,
      });
    }

    return (
      <TouchableOpacity
        style={styles.mainContainer}
        activeOpacity={0.7}
        onPress={pressHandle}>
        <ImageBackground
          source={{uri: currentCityDataImage}}
          resizeMode="cover"
          style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={styles.text}>{itemData.item}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{justifyContent: 'center', padding: 10}}>
      <FlatList
        data={cities}
        keyExtractor={item => item}
        renderItem={renderCites}
      />
    </View>
  );
};

export default CityPreview;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    width: '100%',
    height: 180,
    backgroundColor: '#7D0A0A',
    overflow: 'hidden',
    marginVertical: 10,
    // marginHorizontal: 20,
  },
  text: {
    fontWeight: '600',
    fontSize: 40,
    color: 'white',
  },
});
