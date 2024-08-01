import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {hotelSearchByName, deleteTextIcon} from '../icons';
import {COLORS} from '../../constant/colors';

const SearchInput = ({textInputConfig, onPress}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.activeTind,
        marginVertical: 5,
        height: 35,
        marginHorizontal: 60,
        borderRadius: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 6,
      }}>
      <Text>{hotelSearchByName}</Text>
      <TextInput
        style={{flex: 1, fontSize: 20}}
        {...textInputConfig}></TextInput>
      <TouchableOpacity onPress={onPress}>{deleteTextIcon}</TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
