import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {useContext} from 'react';
import {HotelsContext} from '../store/hotels_context';
// import {AllHotelsList} from '../components/hotelsList';
import {FavoriteCityPerview} from '../components/favoriteDetails';

const Favorite = () => {
  const hotelsCtx = useContext(HotelsContext);
  const favoriteHotelsIds = hotelsCtx.favoriteHotelsIds;

  const cities = Object.keys(hotelsCtx.allHotelsData);

  const findFavoriteHotels = cities.reduce((acc, city) => {
    const cityHotels = hotelsCtx.allHotelsData[city].cityHotels;
    const favoriteHotels = cityHotels.filter(hotel =>
      favoriteHotelsIds.includes(hotel.id),
    );
    return [...acc, ...favoriteHotels];
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {findFavoriteHotels && findFavoriteHotels.length > 1 ? (
        <ImageBackground
          source={require('../assets/bg.jpeg')}
          resizeMode="cover"
          style={[styles.mainContainer]}>
          {/* <AllHotelsList data={findFavoriteHotels} city={cities} /> */}
          <FavoriteCityPerview data={findFavoriteHotels} />
        </ImageBackground>
      ) : (
        <FavoriteCityPerview data={findFavoriteHotels} />
      )}
      {/* <ImageBackground
        source={
          findFavoriteHotels && findFavoriteHotels.length > 0
            ? require('../assets/bg.jpeg')
            : null
        }
        style={[styles.mainContainer]}>
        <FavoriteCityPerview data={findFavoriteHotels} />
      </ImageBackground> */}
      {/* <AllHotelsList data={findFavoriteHotels} city={cities} /> */}
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: 'rgba(22,22,22,255)', flex: 1},
});
