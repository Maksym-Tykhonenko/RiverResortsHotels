import {useState, createContext} from 'react';
import {HOTELS} from '../data/hotelsData';
import {allHotelsTabIcon} from '../components/icons';

export const HotelsContext = createContext({
  ids: [],
  // allHotels: [],
  cities: [],
  addCity: cityName => {},
  addHotel: newHotelData => {},
  addFavorite: id => {},
  removeFavorite: id => {},
});

// const allCities = Object.keys(HOTELS);

export const HotelsProvider = ({children}) => {
  const [allHotelsData, setAllHotelsData] = useState(HOTELS);
  const [favoriteHotelsIds, setFavoriteHotelsIds] = useState([]);
  // const [cities, setCities] = useState(allCities);

  //   this fn will create array list of ids
  const addFavorite = id => {
    setFavoriteHotelsIds(currentFavId => [...currentFavId, id]);
  };

  const removeFavorite = id => {
    setFavoriteHotelsIds(currentFavId =>
      currentFavId.filter(hotelId => hotelId !== id),
    );
  };

  const isFavorite = id => {
    return favoriteHotelsIds.includes(id);
  };

  const addCity = (city, image) => {
    // setCities(prevCities => [...prevCities, city]);
    const cityObject = {
      cityImage: image,
      id: Math.random(),
      cityHotels: [],
    };
    setAllHotelsData(prevHotelsObject => ({
      ...prevHotelsObject,
      [city]: cityObject,
    }));
  };

  const addHotel = (city, newHotelData) => {
    if (allHotelsData[city]) {
      // copy hotels list for this city
      const updatedCityHotels = [
        newHotelData,
        ...allHotelsData[city].cityHotels,
      ];
      // update data for this city
      const updateCityData = {
        ...allHotelsData[city],
        cityHotels: updatedCityHotels,
      };
      // update cityHohotels object
      setAllHotelsData(prevState => ({
        ...prevState,
        [city]: updateCityData,
      }));
    }
    const thisCity = allHotelsData[city].cityHotels;
    // setAllHotelsData(prevHotels => [...prevHotels, newHotelData]);
  };

  const updateRating = (value, hotelId, city) => {
    if (allHotelsData[city] && value) {
      const thisHotelIndex = allHotelsData[city].cityHotels.findIndex(
        hotel => hotel.id === hotelId,
      );
      const thisHotelData = allHotelsData[city].cityHotels[thisHotelIndex];
      // console.log(thisHotelData);

      const updatedHotelData = {
        ...allHotelsData[city].cityHotels[thisHotelIndex],
        rating: value,
      };
      // console.log(updatedHotelData);

      const updatedCityHotels = [...allHotelsData[city].cityHotels];
      updatedCityHotels[thisHotelIndex] = updatedHotelData;
      // console.log(updatedCityHotels);

      const updatedCityData = {
        ...allHotelsData[city],
        cityHotels: updatedCityHotels,
      };
      // console.log(updatedCityData);

      // console.log(
      //   (allHotelsData[city].cityHotels[thisHotelIndex] = updatedHotelData),
      // );

      setAllHotelsData(prevData => ({...prevData, [city]: updatedCityData}));
    }
  };

  const value = {
    favoriteHotelsIds: favoriteHotelsIds,
    allHotelsData: allHotelsData,
    // cities: cities,
    addHotel: addHotel,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    isFavorite: isFavorite,
    addCity: addCity,
    updateRating: updateRating,
  };

  return (
    <HotelsContext.Provider value={value}>{children}</HotelsContext.Provider>
  );
};
