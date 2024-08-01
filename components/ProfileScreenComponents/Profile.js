import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {COLORS} from '../../constant/colors';
import {CustomButton, ImagePicker} from '../ui';

const ProfileComponent = ({data, onUpdatePhoto, onUpdateName}) => {
  const [nameUpdate, setNameUpdate] = useState(false);
  const [newName, setNewName] = useState(data.name);
  const image = data.image[0];

  async function handleProfileImage(i) {
    onUpdatePhoto(i);
  }
  async function handleProfileName(n) {
    onUpdateName(newName);
    setNameUpdate(false);
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: COLORS.newBG,
      }}>
      <View>
        {nameUpdate ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              textAlign: 'center',
              gap: 30,
            }}>
            <TextInput
              style={styles.inputName}
              value={newName}
              onChangeText={setNewName}
            />
            <CustomButton
              onPressFn={handleProfileName}
              btnStyle={styles.buttonStyle}
              textStyle={styles.buttonText}>
              Save
            </CustomButton>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setNameUpdate(true)}>
            <Text style={styles.name}>{newName}</Text>
          </TouchableOpacity>
        )}
        <ImagePicker onSelectImage={i => handleProfileImage(i)}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageProfile} source={{uri: image}} />
          </View>
        </ImagePicker>
      </View>
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  text: {
    color: 'white',
    fontSize: 58,
    fontWeight: 'bold',
    padding: 10,
  },

  name: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
    color: COLORS.activeTind,
    marginBottom: 20,
  },
  country: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  imageContainer: {
    borderRadius: 60,
    width: 300,
    height: 300,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: COLORS.activeTind,
  },
  imageProfile: {
    height: '100%',
    width: '100%',
  },
  inputName: {
    height: 40,
    flex: 1,
    fontSize: 18,
    color: COLORS.black,
    backgroundColor: COLORS.lightBlue,
    padding: 6,
    borderRadius: 6,
    backgroundColor: COLORS.activeTind,
    marginBottom: 20,
  },
  buttonStyle: {
    padding: 6,
    borderColor: COLORS.activeTind,
    borderWidth: 1,
    width: 100,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.green,
    fontSize: 22,
  },
});
