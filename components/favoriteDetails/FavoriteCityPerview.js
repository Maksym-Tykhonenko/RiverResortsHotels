import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HotelsContext} from '../../store/hotels_context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hotelLocationIcon} from '../icons';

const FavoriteCityPerview = ({data}) => {
  const navigation = useNavigation();

  const {addFavorite, removeFavorite, isFavorite} = useContext(HotelsContext);
  
  function favoriteHandle(hotelId) {
    if (isFavorite(hotelId)) {
      removeFavorite(hotelId);
    } else {
      addFavorite(hotelId);
    }
  }

  function renderHotel(itemData) {

    const ITEM = itemData.item;
    const HOTELID = ITEM.id;
    const ADDRESS = ITEM.address;
    const NAME = ITEM.name;
    const IMAGE = ITEM.images[0];
    const isHotelFavorite = isFavorite(ITEM.id);

    function handleHotelDetails() {
      navigation.navigate('FavoriteHotelDetail', {
        hotelId: HOTELID,
        image: IMAGE,
        name: NAME,
        address: ADDRESS,
        //   city: city,
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
    <View style={{height: 700}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderHotel}
      />
    </View>
  );
};

export default FavoriteCityPerview;

const styles = StyleSheet.create({
  mainContainer: {height: 300, marginHorizontal: 20},
  address: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  hotelName: {
    color: '#F9F9E0',
    fontSize: 34,
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
