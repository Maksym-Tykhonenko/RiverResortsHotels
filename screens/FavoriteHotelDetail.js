import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {HotelsContext} from '../store/hotels_context';
import {COLORS} from '../constant/colors';
import {
  Rating,
  AmenitiesRender,
  SingelHotelGallery,
  CustomCalendar,
} from '../components/hoteDetails';
import {Map} from '../components/ui';

const FavoriteHotelDetail = ({route}) => {
  const {updateRating, allHotelsData} = useContext(HotelsContext);

  const navigation = useNavigation();
  const hotelsCtx = useContext(HotelsContext);
  // const allHotelsData = hotelsCtx.allHotelsData;
  const cities = Object.keys(hotelsCtx.allHotelsData);
  const HOTELID = route.params.hotelId;

  const thisHotel = cities.reduce((acc, city) => {
    const cityHotels = allHotelsData[city].cityHotels;
    const favHotel = cityHotels.filter(hotel => HOTELID.includes(hotel.id));

    return [...acc, ...favHotel];
  }, []);

  const findCityByHotelId = (hotelId, cities) => {
    return Object.keys(cities).find(city => {
      return cities[city].cityHotels.some(hotel => hotel.id === hotelId);
    });
  };

  const city = findCityByHotelId(HOTELID, allHotelsData);

  const HOTEL_INDEX = allHotelsData[city].cityHotels.findIndex(
    hotel => hotel.id === HOTELID,
  );
  const HOTEL_RATING = allHotelsData[city]?.cityHotels[HOTEL_INDEX].rating;

  function goBackHandler() {
    navigation.goBack();
  }

  function handleUpdaterating(value) {
    updateRating(value, HOTELID, city);
  }

  return (
    <ScrollView style={{backgroundColor: COLORS.newBG,flex:1}}>
      <View>
        <Image
          style={styles.ImageBackground}
          source={{uri: thisHotel[0].images[0]}}
        />
        <TouchableOpacity
          onPress={goBackHandler}
          style={styles.goBackContainer}>
          <View>
            <Text style={styles.goBackText}>Go Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.hotelDetailsContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: COLORS.activeTind,
                fontSize: 24,
                textAlign: 'center',
              }}>
              {thisHotel[0].name}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Rating rating={HOTEL_RATING} onRatingHandle={handleUpdaterating} />
          </View>
          <View>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{thisHotel[0].address}</Text>
            </View>
            <View>
              <Map
                latitude={thisHotel[0].latitude}
                longitude={thisHotel[0].longitude}
              />
            </View>
          </View>
          <AmenitiesRender data={thisHotel[0].amenities} />
          <SingelHotelGallery images={thisHotel[0].images} />
          <CustomCalendar />
        </View>
      </View>
    </ScrollView>
  );
};

export default FavoriteHotelDetail;

const styles = StyleSheet.create({
  ImageBackground: {
    height: 400,
    width: '100%',
  },
  goBackContainer: {
    width: 90,
    backgroundColor: COLORS.white + 40,
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 6,
    marginTop: -80,
  },
  goBackText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  hotelDetailsContainer: {
    marginTop: 20,
    backgroundColor: COLORS.newBG,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15,
  },
  addressContainer: {
    backgroundColor: COLORS.white + 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 6,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  name: {},
});
