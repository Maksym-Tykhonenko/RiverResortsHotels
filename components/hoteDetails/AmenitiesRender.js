import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLORS} from '../../constant/colors';

const AmenitiesRender = ({data}) => {
  return (
    <View>
      <Text style={{marginTop: 8, color: COLORS.white, marginHorizontal: 10}}>
        Amenities
      </Text>
      <ScrollView
        horizontal={true}
        style={{marginVertical: 10, marginHorizontal: 5}}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                borderRadius: 20,
                borderColor: COLORS.activeTind,
                justifyContent: 'center',
                alignItems: 'center',
                width: 140,
                backgroundColor: COLORS.white + 30,
                marginHorizontal: 5,
              }}>
              <Text
                style={{
                  margin: 5,
                  padding: 10,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  borderRadius: 8,
                }}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AmenitiesRender;

const styles = StyleSheet.create({});
