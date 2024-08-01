import {StyleSheet, Text, View} from 'react-native';
import {AirbnbRating, Rating as CustomRating} from 'react-native-ratings';
import {COLORS} from '../../constant/colors';
import {useEffect, useContext} from 'react';
import {HotelsContext} from '../../store/hotels_context';

const RatingCustom = ({onRatingHandle, rating, city, hotelId}) => {
  // const {updateRating, allHotelsData} = useContext(HotelsContext);
  // const hotelIndex = allHotelsData[city]?.cityHotels.findIndex(
  //   hotel => hotel.id === hotelId,
  // );

  // const hotelRating = allHotelsData[city]?.cityHotels[hotelIndex].rating;

  // function handleUpdateRating(value) {
  //   updateRating(value, hotelId, city);
  // }
  // useEffect(() => {
  //   handleUpdateRating();
  // }, [city, hotelId]);
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <CustomRating
          type="star"
          ratingBackgroundColor={COLORS.newBG}
          imageSize={30}
          ratingColor={COLORS.newBG}
          tintColor={COLORS.newBG}
          startingValue={rating}
          onFinishRating={value => onRatingHandle(value)}
        />
      </View>
    </View>
  );
};

export default RatingCustom;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
});
