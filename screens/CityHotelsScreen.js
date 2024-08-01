import {StyleSheet, SafeAreaView, ImageBackground, View} from 'react-native';
import {useContext, useLayoutEffect} from 'react';
import {HotelsContext} from '../store/hotels_context';
import {AllHotelsList} from '../components/hotelsList';
import {COLORS} from '../constant/colors';
import {AddNewHotelIcon} from '../components/icons/index';

const CityHotels = ({route, navigation}) => {
  const hotelsCtx = useContext(HotelsContext);
  const CITY = route.params?.cityName;
  const CITY_HOTELS = hotelsCtx.allHotelsData[CITY].cityHotels;

  function addNewHotelNavigationHandler() {
    navigation.navigate('AddNewHotelScreen', {city: CITY});
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <>
            <AddNewHotelIcon onPressFn={addNewHotelNavigationHandler} />
          </>
        );
      },
    });
  });

  return (
    // <ImageBackground
    //   source={require('../assets/bg.jpeg')}
    //   resizeMode="cover"
    //   style={styles.imageBg}>
    <View style={styles.innerBg}>
      <SafeAreaView style={styles.innerBg}>
        <AllHotelsList data={CITY_HOTELS} navigation={navigation} city={CITY} />
      </SafeAreaView>
    </View>
    // </ImageBackground>
  );
};

export default CityHotels;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    height: '100%',
  },
  innerBg: {
    flex: 1,
    backgroundColor: COLORS.newBG,
  },
});
