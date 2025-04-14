import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from "expo-app-loading";

import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import BedCard from '@/components/BedCard'
import { fetchBed } from '@/services/api'
import useFetch from '@/services/useFetch'
import { wp, hp } from '@/utils/dimensions'
import * as SplashScreen from 'expo-splash-screen'

const index = () => {
  
  const {
    data: bed,
    loading: bedLoading,
    error: bedError,
  } = useFetch(() => fetchBed({ query: "" }));


  return (
    <SafeAreaView className='bg-[#FFFFFF] flex-1'>
      <View>
      <Image source={images.logoImage} className='w-[80px] h-[72px] object-contain' style={{marginLeft:wp(39)}}/>
      <View style={{width: wp(90) }} className='mx-auto'>
          <Text className='text-[#000000]' style={{fontFamily:"Nunito"}}>Hello Caregiver,</Text>
        </View>
    </View>
    <ScrollView className="flex-1 mx-auto" style={{width: wp(90), height: hp(72) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 50 }}> 
        { bedLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          /> ) : bedError ? (
            <Text>Error: {bedError?.message }</Text>
          ) : (

        <FlatList data={bed}
          renderItem={({ item }) => <BedCard {...item}  />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          paddingRight: 5,
         
          marginBottom: 0,
        }}
        className="mt-2 "
        scrollEnabled={false}

        />
      )}
        <Text className='mb-20'>Done</Text>
      
    </ScrollView>
    </SafeAreaView>
    
  )
}

export default index



