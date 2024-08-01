import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {COLORS} from '../constant/colors';
import {
  ProfileComponent,
  ProfileForm,
} from '../components/ProfileScreenComponents';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState();
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await AsyncStorage.getItem('user');
        const userData = user ? JSON.parse(user) : null;

        if (userData && userData.id) {
          console.log('Data from asyncstorage', userData);
          setProfileData(userData);
          setIsProfile(true);
        } else {
          console.log('no data found');
        }
      } catch (error) {
        console.log('error fetching', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 32}}>User Data Loading...</Text>
      </View>
    );
  }

  const handleUserFormSubmit = async FormData => {
    console.log('handleSubmitUserForm-', FormData);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(FormData));
      setProfileData(FormData);
      setIsProfile(true);
    } catch (error) {
      console.log('Data was not saved', error);
    }
  };

  async function handleProfilePhotoUpdate(photo) {
    console.log('Profile Screen update photo fn', photo);
    try {
      const user = await AsyncStorage.getItem('user');
      const userData = user ? JSON.parse(user) : {};
      userData.image = photo;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setProfileData(userData);
    } catch (error) {
      console.log('Failed to update user image', error);
    }
  }

  async function handleProfileNameUpdate(name) {
    console.log('profile screen', name);

    try {
      const user = await AsyncStorage.getItem('user');
      const userData = user ? JSON.parse(user) : {};
      userData.name = name;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setProfileData(userData);
    } catch (error) {
      console.log('Failed to update user name', error);
    }
  }

  return (
    <View style={{backgroundColor: COLORS.cityHotelsBg, flex: 1}}>
      {isProfile ? (
        <ProfileComponent
          data={profileData}
          onUpdatePhoto={handleProfilePhotoUpdate}
          onUpdateName={handleProfileNameUpdate}
        />
      ) : (
        <ProfileForm onSubmit={handleUserFormSubmit} />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
