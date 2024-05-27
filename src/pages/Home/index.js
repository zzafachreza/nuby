import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap, MyHeader } from '../../components';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = () => {


    getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'menu').then(res => {
        console.log(res.data);
        setData(res.data);

      });

    })

    axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });





  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 8,
            color: colors.secondary,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <View style={{
      flex: 1,
      width: "100%",
      height: "100%",

      backgroundColor: colors.primary,



    }}>

      {/* HEADERS */}
      <View style={{
        flexDirection: "row",
        backgroundColor: colors.white,
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-between'


      }}>

        <View>
          <Text style={{
            fontFamily: fonts.primary[800],
            color: 'black'

          }}>Selamat Datang,</Text>
          <Text style={{ fontFamily: fonts.primary[400], color: "black" }}>
            {user.nama_lengkap}
          </Text>
        </View>

        <View>
        </View>

      </View>

      <View style={{
        flex: 1,
        padding: 10,
      }}>




        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <TouchableNativeFeedback onPress={() => {
              if (item.id == 0) {
                navigation.navigate('IMTCalculator')
              } else {
                navigation.navigate('ArtikeLainnya', item)
              }
            }}>
              <View style={{
                marginVertical: 5,
                flexDirection: "row",
                backgroundColor: colors.secondary,
                padding: 10,
                alignItems: 'center',
                borderRadius: 5,
              }}>
                <Image source={{
                  uri: item.image
                }} style={{
                  marginHorizontal: 10,
                  width: 50,
                  height: 50,
                  resizeMode: 'contain'
                }} />
                <Text style={{
                  flex: 1,
                  left: 10,
                  fontFamily: fonts.primary[600],
                  fontSize: 18
                }}>{item.menu}</Text>
              </View>
            </TouchableNativeFeedback>
          )
        }} />
















      </View>


    </View>

  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})