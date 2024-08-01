import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useState, useContext} from 'react';
import {COLORS} from '../constant/colors';
import {HotelsContext} from '../store/hotels_context';
import {CustomInput, ImagePicker} from '../components/ui';
import {SingelHotelGallery} from '../components/hoteDetails';

const AddNewHotelScreen = ({route, navigation}) => {
  const city = route.params.city;
  const hotelsCtx = useContext(HotelsContext);
  const cityHotels = hotelsCtx.allHotelsData[city].cityHotels;
  const [hotelImages, setHotelImages] = useState([]);

  const [newHotel, setNewHotel] = useState({
    id: Math.random().toString(),
    name: '',
    description: '',
    rating: '3',
    address: '',
    isFavorite: false,
    images: [],
    latitude: '',
    longitude: '',
    amenities: [],
  });

  function inputChangeHandler(inputIdent, value) {
    setNewHotel(currentValue => {
      return {...currentValue, [inputIdent]: value};
    });
  }

  function saveImageHandler(i) {
    setHotelImages(prevImages => {
      const updateImages = [...prevImages, ...i];
      inputChangeHandler('images', updateImages);
      return updateImages;
    });
  }
  function handleAmenities(text) {
    const amenitiesData = text.split(' ');
    inputChangeHandler('amenities', amenitiesData);
  }

  function addHotelHandler() {
    // addHotel(newHotel);
    hotelsCtx.addHotel(city, newHotel);
    navigation.goBack();
  }
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/bg.jpeg')}>
      <View style={styles.mainContainer}>
        <SafeAreaView>
          <ScrollView style={{height: 460}}>
            <View style={{flexDirection: 'row'}}>
              <CustomInput
                style={styles.rowInput}
                label="Hotel name"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'ascii-capable',
                  value: newHotel.name,
                  autoFocus: true,
                  onChangeText: inputChangeHandler.bind(this, 'name'),
                }}
              />
              <CustomInput
                style={styles.rowInput}
                label="Address"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'ascii-capable',
                  value: newHotel.address,
                  autoFocus: true,
                  onChangeText: inputChangeHandler.bind(this, 'address'),
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CustomInput
                style={styles.rowInput}
                label="Latitude"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'numeric',
                  value: newHotel.latitude,
                  autoFocus: true,
                  onChangeText: inputChangeHandler.bind(this, 'latitude'),
                }}
              />
              <CustomInput
                style={styles.rowInput}
                label="Longitude"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'numeric',
                  value: newHotel.longitude,
                  autoFocus: true,
                  onChangeText: inputChangeHandler.bind(this, 'longitude'),
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CustomInput
                style={styles.rowInput}
                label="Phone"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'numeric',
                  value: newHotel.phone,
                  autoFocus: true,
                  onChangeText: inputChangeHandler.bind(this, 'phone'),
                }}
              />
              <CustomInput
                style={styles.rowInput}
                label="Amenities"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'numeric',
                  value: newHotel.amenities,
                  autoFocus: true,
                  onChangeText: text => handleAmenities(text),
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <CustomInput
                style={styles.rowInput}
                label="Description"
                textStyle={styles.textStyle}
                containerStyle={{backgroundColor: COLORS.activeTind, flex: 1}}
                textInputConfig={{
                  keyboardType: 'ascii-capable',
                  value: newHotel.description,
                  autoFocus: true,
                  onChangeText: inputChangeHandler.bind(this, 'description'),
                  multiline: true,
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                borderColor: COLORS.activeTind,
                borderWidth: 1,
                marginHorizontal: 120,
                borderRadius: 6,
              }}>
              <ImagePicker
                onSelectImage={image => saveImageHandler(image)}
                style={{color: COLORS.activeTind, fontSize: 20, padding: 5}}>
                Add Images
              </ImagePicker>
            </View>
          </ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                width: 200,
                borderWidth: 2,
                borderColor: COLORS.tabBarBG,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={addHotelHandler}>
              <Text style={styles.textStyle}>Create Hotel</Text>
            </TouchableOpacity>
            <SingelHotelGallery images={hotelImages} />
          </View>
        </SafeAreaView>

        {/* TEST BUTTON */}
      </View>
    </ImageBackground>
  );
};

export default AddNewHotelScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: COLORS.cityHotelsBg,
  },
  rowInput: {
    flex: 1,
  },
  textStyle: {
    fontSize: 22,
    color: COLORS.activeTind,
  },
});
