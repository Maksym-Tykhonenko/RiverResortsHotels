import {StyleSheet, Text, View, Image} from 'react-native';
import {useState} from 'react';
import {COLORS} from '../../constant/colors';

const PhotoPreview = ({image}) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  return (
    <View style={{alignItems: 'center', borderRadius: 6}}>
      <Image
        source={{uri: image[0]}}
        style={{
          width: '50%',
          height: 300,
          borderWidth: 3,
          borderColor: COLORS.activeTind,
          borderRadius: Math.min(imageWidth, imageHeight) / 5,
        }}
        resizeMode="contain"
        onLayout={event => {
          const {width, height} = event.nativeEvent.layout;
          setImageWidth(width);
          setImageHeight(height);
        }}
      />
    </View>
  );
};

export default PhotoPreview;

const styles = StyleSheet.create({});
