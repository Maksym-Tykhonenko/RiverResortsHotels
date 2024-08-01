import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {HotelsContext} from '../../store/hotels_context';
import {hotelLocationIcon} from '../icons';
import {SearchInput} from '../ui';

const AllCityHotelsList = ({data, city}) => {
  const [filterName, setFilterName] = useState('');
  const navigation = useNavigation();
  const {addFavorite, removeFavorite, isFavorite, updateRating} =
    useContext(HotelsContext);

  function favoriteHandle(hotelId) {
    // const dummyRating = 5;
    // updateRating(dummyRating, hotelId, city);
    if (isFavorite(hotelId)) {
      removeFavorite(hotelId);
    } else {
      addFavorite(hotelId);
    }
  }

  const filterByName = data.filter(hotel =>
    hotel.name.toLowerCase().includes(filterName.toLowerCase()),
  );

  function deleteSearchText() {
    setFilterName('');
  }

  function renderHotel(itemData) {
    const ITEM = itemData.item;
    const HOTELID = ITEM.id;
    const ADDRESS = ITEM.address;
    const NAME = itemData.item.name;
    const IMAGE = ITEM.images[0];
    const isHotelFavorite = isFavorite(ITEM.id);

    function handleHotelDetails() {
      navigation.navigate('HotelDetailsScreen', {
        hotelId: HOTELID,
        city: city,
      });
    }

    const favoriteIcon = (
      <MaterialIcons
        name="favorite"
        color={isHotelFavorite ? 'red' : 'white'}
        size={26}
        onPress={() => favoriteHandle(ITEM.id)}
      />
    );
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={handleHotelDetails}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: IMAGE}}
          style={styles.imageBg}>
          <View style={styles.internalContainer}>
            <View style={{alignItems: 'flex-end', width: '100%', height: 60}}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {favoriteIcon}
              </TouchableOpacity>
            </View>
            <View style={{width: 350}}>
              <Text style={styles.hotelName}>{NAME}</Text>
              <Text style={styles.address}>
                {hotelLocationIcon}
                {ADDRESS}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{height: 710}}>
      <View>
        <SearchInput
          onPress={deleteSearchText}
          textInputConfig={{
            placeholder: 'Type hotel name...',
            onChangeText: value => setFilterName(value),
            value: filterName,
          }}
        />
      </View>
      <FlatList
        data={filterByName}
        keyExtractor={item => item.id}
        renderItem={renderHotel}
      />
    </View>
  );
};

export default AllCityHotelsList;

const styles = StyleSheet.create({
  mainContainer: {height: 280, marginHorizontal: 20},
  address: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  hotelName: {
    color: '#F9F9E0',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 10,
  },
  imageBg: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    marginVertical: 10,
    padding: 10,
  },
  internalContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
});
