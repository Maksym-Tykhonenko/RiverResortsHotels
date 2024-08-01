import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {AddCity, CityPreview} from '../components/mainScreenComponents';
import {COLORS} from '../constant/colors';

const MainScreen = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        {/* <View style={{backgroundColor: 'pink', flex:1}}> */}
        <View style={styles.textHeader}>
          <Text style={styles.text}>Find your favorite place</Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <AddCity />
        </View>
        <View style={{height: 650}}>
          <CityPreview navigation={navigation} />
        </View>
        {/* </View> */}
      </SafeAreaView>
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: 'rgba(22,22,22,255)', flex: 1},
  textHeader: {
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 28,
    marginVertical: 5,
    color: COLORS.activeTind,
  },
});
