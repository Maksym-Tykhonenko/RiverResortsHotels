import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {CustomButton} from '../components/ui';

const Welcom = ({navigation}) => {
  function handleToMain() {
    navigation.navigate('Main');
  }
  return (
    // <SafeAreaView style={{flex: 1, margin: 0, padding: 0}}>
    <ImageBackground
      // source={require('../assets/niagara.jpg')}
      // source={{
      //   uri: 'https://media.istockphoto.com/id/1346160571/photo/north-saskatchewan-river.jpg?s=612x612&w=0&k=20&c=fbVOE0x_Eze6eh0VzDbxGUqV66mCsV046iN4y7UCmOA=',
      // }}
      style={{
        flex: 1,
        justifyContent: 'flex-end', // Додаємо для центрованого тексту, опціонально
        alignItems: 'center',
        backgroundColor: 'rgba(22,22,22,255)',
      }}
      resizeMode="cover">
      <View style={{marginBottom: 70, marginHorizontal: 5}}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.text}>Explore the </Text>
          <Text style={styles.text}>Beauty Hotels</Text>
        </View>

        <View style={{alignItems: 'flex-end', marginTop: 20}}>
          <CustomButton
            onPressFn={handleToMain}
            textStyle={{color: 'white', fontSize: 22}}
            btnStyle={{
              padding: 15,
              borderRadius: 50,
              backgroundColor: 'green',
              width: 200,
              alignItems: 'center',
            }}>
            Explore
          </CustomButton>
        </View>
      </View>
    </ImageBackground>
    // {/* </SafeAreaView> */}
  );
};

export default Welcom;

const styles = StyleSheet.create({
  text: {
    fontSize: 55,
    color: 'white',
    fontWeight: 'bold',
    // margin: 3,
  },
  subText: {
    fontSize: 18,
    color: 'white',
  },
});
