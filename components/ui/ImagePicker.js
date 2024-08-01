import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constant/colors';
import {launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = ({onSelectImage, style, children}) => {
  const handleResponse = response => {
    if (response.didCancel) {
      Alert.alert('Operation canceled');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const image = response.assets[0].uri;

      const images = response.assets.map(asset => asset.uri);
      onSelectImage(images);
    } else {
      Alert.alert('No image selected');
    }
  };

  const imageHandle = () => {
    const options = {storageOptions: {path: 'images'}, selectionLimit: 0};
    launchImageLibrary(options, handleResponse);
  };

  return (
    <TouchableOpacity style={styles.btnStyle} onPress={() => imageHandle()}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  btnStyle: {
    // padding: 3,
    // margin: 6,
    // marginBottom: 16,
    // borderColor: COLORS.activeTind,
    // borderWidth: 1,
    // width: 200,
    // borderRadius: 6,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
