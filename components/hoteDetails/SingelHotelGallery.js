import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';

const SingelHotelGallery = ({images}) => {

  return (
    // <View>
    <ScrollView
      horizontal={true}
      style={{marginVertical: 10, marginHorizontal: 5}}>
      {images.map((image, index) => {
        return (
          <View key={index}>
            <Image
              source={{uri: image}}
              style={{
                width: 150,
                height: 180,
                borderRadius: 20,
                marginHorizontal: 5,
              }}
            />
          </View>
        );
      })}
    </ScrollView>
    // </View>
  );
};

export default SingelHotelGallery;

const styles = StyleSheet.create({});
