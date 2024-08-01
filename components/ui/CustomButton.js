import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CustomButton = ({children, textStyle, btnStyle, onPressFn}) => {
  return (
    <TouchableOpacity style={btnStyle} activeOpacity={0.7} onPress={onPressFn}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
