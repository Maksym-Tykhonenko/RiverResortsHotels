import {StyleSheet, Text, View, TextInput} from 'react-native';
import {COLORS} from '../../constant/colors';

const CustomInput = ({label, style, textInputConfig, textStyle}) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.label, textStyle]}>{label}</Text>
      </View>
      <TextInput style={inputStyles} {...textInputConfig} autoFocus />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  input: {
    fontSize: 18,
    color: COLORS.green,
    backgroundColor: COLORS.activeTind,
    padding: 6,
    borderRadius: 6,
  },
  inputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
    // width: '',
  },
});
