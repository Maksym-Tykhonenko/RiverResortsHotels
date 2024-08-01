import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constant/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const userTabIcon = color => (
  <Feather name="user" size={30} color={color} />
);

export const allHotelsTabIcon = color => (
  <Fontisto name="hotel" color={color} size={30} />
);

export const favoritesHotelsTabIcon = color => (
  <MaterialIcons name="favorite-border" color={color} size={30} />
);

export const AddNewHotelIcon = ({onPressFn}) => (
  <TouchableOpacity
    onPress={onPressFn}
    style={{marginHorizontal: 20}}
    activeOpacity={0.6}>
    <View style={{flexDirection: 'row', gap: 8, flex: 1, alignItems: 'center'}}>
      <Text
        style={{color: COLORS.activeTind, fontSize: 20, fontWeight: 'bold'}}>
        +
      </Text>
      <Fontisto name="hotel" color={COLORS.activeTind} size={36} />
    </View>
  </TouchableOpacity>
);

export const hotelLocationIcon = (
  <Ionicons name="location-outline" color="white" size={26} />
);

export const hotelSearchByName = (
  <MaterialCommunityIcons name="home-search-outline" color="green" size={26} />
);

export const deleteTextIcon = <Feather name="delete" color="green" size={26} />;
