import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useState, useContext} from 'react';
import {HotelsContext} from '../../store/hotels_context';
import {COLORS} from '../../constant/colors';
import {ImagePicker} from '../ui';

const AddCity = () => {
  const hotelsCtx = useContext(HotelsContext);
  const [isNewCity, setIsNewCity] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityImage, setCityImage] = useState('');

  function handleCityImage(image) {
    setCityImage(image);
  }

  function handleNewCity() {
    if (!cityName.trim()) {
      Alert.alert('Invalid input', 'Please enter city name');
      return;
    }

    hotelsCtx.addCity(cityName.trim(), cityImage[0]);
    setCityName('');
    setIsNewCity(false);
  }

  return (
    <SafeAreaView>
      {isNewCity ? (
        <View>
          <View style={{height: 40, marginHorizontal: 10}}>
            <View style={{flexDirection: 'row', flex: 1, gap: 20}}>
              <TextInput
                style={styles.inputName}
                value={cityName}
                onChangeText={text => {
                  setCityName(text);
                }}
                placeholder="Type City Name"
                placeholderTextColor={COLORS.activeTind + 60}
              />
              <TouchableOpacity
                onPress={handleNewCity}
                style={{
                  flex: 1,
                  width: 100,
                  backgroundColor: COLORS.tabBarBG,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.activeTind,
                    fontWeight: 'bold',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 40,
              marginHorizontal: 10,
              backgroundColor: COLORS.tabBarBG,
              fontSize: 28,
              marginVertical: 3,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImagePicker
              style={{color: COLORS.activeTind, fontSize: 26}}
              onSelectImage={i => handleCityImage(i)}>
              Add City Image
            </ImagePicker>
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsNewCity(true)}
            style={styles.mainContainer}>
            <Text style={styles.text}>Add City</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default AddCity;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    width: '100%',
    height: 60,
    backgroundColor: COLORS.green,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal:10
  },
  text: {
    fontSize: 28,
    color: COLORS.activeTind,
  },
  inputName: {
    height: 40,
    flex: 1,
    fontSize: 18,
    backgroundColor: COLORS.tabBarBG,
    color: 'white',
    padding: 6,
    borderRadius: 6,
  },
});
