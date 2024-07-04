import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import { apiURL, getData, storeData } from '../../utils/localStorage'
import axios from 'axios'
colors

export default function HasilIMTCalculator({ navigation, route }) {
    const [user, setUser] = useState({});
    const item = route.params;
    const IMT = parseFloat(item.berat_badan / Math.pow(item.tinggi_badan / 100, 2)).toFixed(1);
    var GIZI = '';

    if (IMT < 17) {
        GIZI = 'Sangat Kurus';
    } else if (IMT >= 17 && IMT < 18.5) {
        GIZI = 'Kurus';
    } else if (IMT >= 18.5 && IMT <= 25) {
        GIZI = 'Normal';
    } else if (IMT > 25 && IMT <= 27) {
        GIZI = 'Kelebihan Berat Badan';
    } else if (IMT > 27) {
        GIZI = 'Obesitas';
    }
    const backPage = () => {
        navigation.goBack();

    }

    useEffect(() => {
        getData('user').then(uu => {
            axios.post(apiURL + 'add_status_gizi', {
                id: uu.id,
                status_gizi: GIZI,
            })
            setUser({ ...uu, status_gizi: GIZI });
            storeData('user', { ...uu, status_gizi: GIZI })
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: colors.primary, }}>
            <MyHeader judul="Hasil IMT Calculator" onPress={backPage} />
            <ScrollView style={{ padding: 10 }}>

                <View style={{
                    padding: 10,
                    backgroundColor: colors.secondary,
                    borderRadius: 5,
                    alignItems: "center"

                }}>
                    <Text style={{ fontFamily: fonts.primary[600], fontSize: MyDimensi / 3 }}>Hasil :</Text>
                </View>

                {/* NANTI DISINI AKAN MUNCUL HASILNYA */}
                {/* IKUTIN DESAIN YANG ADA DI FIGMA */}
                <MyGap jarak={20} />
                <View style={{ padding: 10, backgroundColor: colors.white, borderRadius: 5, alignItems: "center" }}>
                    {/* NANTI DISINI AKAN MUNCUL HASIL DARI ITUNG IMT NYA */}
                    <Text style={{ fontFamily: fonts.primary[600], fontSize: MyDimensi, textAlign: "center" }}>{IMT}</Text>
                    {/* NANTI DISINI MUNCUL STATUS GIZINYA */}
                    <Text style={{ fontFamily: fonts.primary[400], fontSize: MyDimensi / 3.5, textAlign: "center" }}>Status Gizi Anda: <Text style={{ fontFamily: fonts.primary[600] }}>{GIZI}</Text></Text>
                </View>
                <MyGap jarak={20} />

                <View style={{ padding: 1, backgroundColor: 'white' }}></View>
                <MyGap jarak={20} />
                <View>
                    <Image source={require('../../assets/keteranganhasilimt.png')} style={{
                        width: windowWidth,
                        resizeMode: 'contain',
                        height: windowHeight / 2,

                    }} />
                </View>
                <MyGap jarak={50} />
            </ScrollView>
        </View>
    )
}