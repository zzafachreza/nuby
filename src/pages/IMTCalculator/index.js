import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
colors

export default function IMTCalculator({ navigation }) {
  const backPage = () => {
    navigation.goBack()
  }

  const [kirim, setKirim] = useState({
    umur: '',
    jenis_kelamin: 'Laki-laki',
    tinggi_badan: '',
    berat_badan: ''
  })
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, }}>
      <MyHeader judul="IMT Calculator" onPress={backPage} />
      <ScrollView>

        {/* UMUR */}
        <MyInput label="Umur (thn)" keyboardType='number-pad' onChangeText={x => {
          setKirim({
            ...kirim,
            umur: x
          })
        }} placeholder="Masukan Umur" value={kirim.umur} />
        <MyGap jarak={20} />

        {/* JENIS KELAMIN */}
        <MyPicker value={kirim.jenis_kelamin} onValueChange={x => {
          setKirim({
            ...kirim,
            jenis_kelamin: x
          })
        }} data={[
          { value: 'laki-laki', label: 'Laki-laki' },
          { value: 'perempuan', label: 'Perempuan' },
        ]} label="Jenis Kelamin" />
        <MyGap jarak={20} />

        {/* TINGGI BADAN */}
        <MyInput keyboardType='number-pad' onChangeText={x => {
          setKirim({
            ...kirim,
            tinggi_badan: x
          })
        }} label="Tinggi Badan (cm)" value={kirim.tinggi_badan} placeholder="Masukan Tinggi Badan" />
        <MyGap jarak={20} />

        {/* Berat Badan */}
        <MyInput keyboardType='number-pad' onChangeText={x => {
          setKirim({
            ...kirim,
            berat_badan: x
          })
        }} label="Berat Badan (kg)" value={kirim.berat_badan} placeholder="Masukan Berat Badan" />
        <MyGap jarak={20} />

        <View style={{ padding: 10, }}>
          <MyButton
            title="Lihat Hasil"
            onPress={() => {
              console.log(kirim);
              setKirim({
                umur: '',
                jenis_kelamin: 'Laki-laki',
                tinggi_badan: '',
                berat_badan: ''
              })
              navigation.navigate('HasilIMTCalculator', kirim)
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
}