import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Map = ({latitude, longitude}) => {
  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
      }}>
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapContainer: {
    height: 1,
    height: 300,
    // marginBottom: 30,
    marginHorizontal: 6,
    borderRadius: 20,
  },
});
