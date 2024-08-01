import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomInput, ImagePicker, PhotoPreview} from '../ui';
import {COLORS} from '../../constant/colors';

const ProfileForm = ({onSubmit}) => {
  const [imagePrev, setImagePrev] = useState();
  const [inputValue, setInputValue] = useState({
    name: '',
    image: '',
    date: '',
  });

  function inputsHandler(identifier, newValue) {
    setInputValue(thisValue => {
      return {...thisValue, [identifier]: newValue};
    });
  }

  function resetValuesHandle() {
    setInputValue({name: '', image: '', date: ''});
    setImagePrev('');
  }

  function imageHandler(i) {
    setImagePrev(i);
    inputsHandler('image', i);
  }

  function submitHandler() {
    const userFormData = {
      name: inputValue.name,
      image: inputValue.image,
      date: inputValue.date,
      id: Math.random(),
    };
    const nameIsValid = userFormData.name.trim().length > 0;
    const dataIsValid = userFormData.date.toString() !== 'Invalid Date';
    if (!nameIsValid || !dataIsValid) {
      Alert.alert('Invalid Inputs', 'Check your date and name column');
      return;
    }
    onSubmit(userFormData);
  }
  return (
    // <ImageBackground source={require('../../assets/bg.jpeg')} style={{flex: 1}}>
    <View style={{backgroundColor: COLORS.newBG, flex: 1}}>
      <ScrollView>
        <View style={{justifyContent: 'center', marginTop: 40}}>
          <View style={{flexDirection: 'row'}}>
            <CustomInput
              label="Name"
              textStyle={{color: COLORS.activeTind, fontSize: 24}}
              textInputConfig={{
                placeholder: 'user name',
                keyboardType: 'ascii-capable',
                value: inputValue.name,
                onChangeText: inputsHandler.bind(this, 'name'),
              }}
            />
            <CustomInput
              label="Birth Date"
              textStyle={{color: COLORS.activeTind, fontSize: 24}}
              textInputConfigs={{
                placeholder: 'YYYY-MM-DD',
                keyboardType: 'default',
                maxLength: 10,
                value: inputValue.date,
                onChangeText: inputsHandler.bind(this, 'date'),
              }}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <ImagePicker
              onSelectImage={i => imageHandler(i)}
              style={{
                color: COLORS.activeTind,
                fontSize: 24,
                marginVertical: 8,
              }}
              btnStyle={styles.imagePicker}>
              Add Photo
            </ImagePicker>
          </View>
          {imagePrev && <PhotoPreview image={imagePrev} />}
          <View style={styles.buttonContainer}>
            <CustomButton
              btnStyle={styles.buttonStyle}
              textStyle={styles.buttonText}
              onPressFn={resetValuesHandle}>
              Reset
            </CustomButton>
            <CustomButton
              btnStyle={styles.buttonStyle}
              textStyle={styles.buttonText}
              onPressFn={submitHandler}>
              Save
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
    // </ImageBackground>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  imagePicker: {
    padding: 3,
    margin: 6,
    marginBottom: 16,
    borderColor: COLORS.activeTind,
    borderWidth: 2,
    width: 200,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 6,
    borderColor: COLORS.activeTind,
    borderWidth: 1,
    width: 100,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.activeTind,
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
