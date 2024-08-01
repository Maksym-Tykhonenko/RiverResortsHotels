import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {useContext} from 'react';
import {HotelsContext} from '../store/hotels_context';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../constant/colors';
import {Map} from '../components/ui';
import {
  AmenitiesRender,
  SingelHotelGallery,
  CustomCalendar,
  Rating,
} from '../components/hoteDetails';

const HotelDetailsScreen = ({route}) => {
  const {updateRating, allHotelsData} = useContext(HotelsContext);

  const navigation = useNavigation();
  // const hotelsCtx = useContext(HotelsContext);
  const CITY = route.params.city;
  const HOTELID = route.params.hotelId;
  // console.log(hotelsCtx.allHotelsData[CITY]);
  const CITY_HOTELS = allHotelsData[CITY]?.cityHotels;
  const thisHotel = CITY_HOTELS?.find(element => element.id === HOTELID);
  // console.log(thisHotel)
  const HOTEL_INDEX = allHotelsData[CITY]?.cityHotels.findIndex(
    hotel => hotel.id === HOTELID,
  );
  // console.log('hotel index', HOTEL_INDEX);

  function goBackHandler() {
    navigation.goBack();
  }
  const HOTEL_RATING = allHotelsData[CITY]?.cityHotels[HOTEL_INDEX].rating;

  function handleUpdaterating(value) {
    // console.log('HotelDetailScreen-', value);
    // console.log(value, HOTELID, CITY);
    updateRating(value, HOTELID, CITY);
  }

  return (
    <ScrollView style={{backgroundColor: COLORS.newBG, flex: 1}}>
      <View>
        <Image
          style={styles.ImageBackground}
          source={{uri: thisHotel.images[0]}}
        />
        <TouchableOpacity
          onPress={goBackHandler}
          style={styles.goBackContainer}>
          <View>
            <Text style={styles.goBackText}>Go Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.hotelDetailsContainer}>
          {/* <ImageBackground
            resizeMode="cover"
            source={require('../assets/bg.jpeg')}
            style={{flex: 1, height: '100%'}}> */}
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{thisHotel.name}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Rating
                rating={HOTEL_RATING}
                city={CITY}
                hotelId={HOTELID}
                onRatingHandle={handleUpdaterating}
              />
            </View>
            <View>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>{thisHotel.address}</Text>
              </View>
              <View>
                <Map
                  latitude={thisHotel.latitude}
                  longitude={thisHotel.longitude}
                />
              </View>
            </View>
            <AmenitiesRender data={thisHotel.amenities} />
            <SingelHotelGallery images={thisHotel.images} />
            <CustomCalendar />
          {/* </ImageBackground> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default HotelDetailsScreen;

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
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  nameText: {
    color: COLORS.activeTind,
    fontSize: 24,
    textAlign: 'center',
  },
});
