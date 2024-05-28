import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';

export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    telepon: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);




  const masuk = () => {


    if (kirim.telepon == null && kirim.password == null) {
      Alert.alert(MYAPP, 'telepon dan Password tidak boleh kosong !');
    } else if (kirim.telepon == null) {
      Alert.alert(MYAPP, 'telepon tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });



    }




  }

  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (
    <ImageBackground source={require('../../assets/bgimg.png')} style={{
      flex: 1,
      width: '100%',
      height: '100%',
    }}>

      <ScrollView style={{ position: "relative" }}>


        <Animated.View style={{
          padding: 10,
          flex: 1, margin: 10,
          bottom: card,
          borderRadius: 0,

        }}>

          <Image source={require('../../assets/icon.png')} style={{
            height: 200, width: 200,
            alignItems: 'center',
            alignSelf: "center",
            // marginTop: -30
          }} />


          <Text style={{
            fontFamily: fonts.primary[600],
            color: "white",
            fontSize: MyDimensi / 2.8,
            marginTop: 25,
            textAlign: "center"

          }}>LOGIN</Text>
          <Text style={{
            fontFamily: fonts.primary[400],
            color: "white",
            fontSize: MyDimensi / 5.8,
            marginTop: 0,
            textAlign: "center"

          }}>Silahkan login dengan akun anda</Text>

          {/* USERNAME INPUT */}


          <MyGap jarak={25} />

          <MyInput label="Nomor Telepon" onChangeText={x =>
            setKirim({
              ...kirim,
              telepon: x
            })
          } iconname="call" keyboardType='phone-pad' placeholder="Masukan Nomor Telepon" />


          <MyGap jarak={20} />
          {/* PASSWORD INPUT */}


          <MyInput label="Password" onChangeText={x =>
            setKirim({
              ...kirim,
              password: x
            })
          } iconname="lock-closed" placeholder="Masukan password" secureTextEntry={true} />


          {/* BUTTON LOGIN */}
          <TouchableOpacity onPress={() => {
            let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
            Linking.openURL(urlWA)
          }} style={{
            marginTop: 0,
          }}>
            <Text style={{
              textAlign: 'right',
              fontFamily: fonts.primary[400],
              color: colors.white,
              fontSize: MyDimensi / 4,
              marginTop: 10,

            }}>Lupa password ?</Text>
          </TouchableOpacity>

          <MyGap jarak={30} />
          <MyGap jarak={0} />
          {!loading &&





            <MyButton
              onPress={masuk}
              title="Login"


              Icons="log-in-outline"
            />


          }

          {!loading && <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
            <View style={{
              marginTop: 10,

              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: MyDimensi / 4,
                fontFamily: fonts.primary[400],
                textAlign: 'center',
                color: colors.white
              }}>Belum mempunyai akun? <Text style={{
                fontSize: MyDimensi / 4,
                fontFamily: fonts.primary[600],
                textAlign: 'center',
                color: colors.secondary
              }}>Register</Text></Text>
            </View>
          </TouchableWithoutFeedback>}

        </Animated.View>
        <View style={{ marginTop: '10%' }}>

        </View>





        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.white} size="large" />
        </View>}
      </ScrollView>
    </ImageBackground>




  );
}

const styles = StyleSheet.create({});
