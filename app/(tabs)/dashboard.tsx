import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from "expo-app-loading";

import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import BedCard from '@/components/BedCard'
import { fetchBed } from '@/services/api'
import useFetch from '@/services/useFetch'
import { wp, hp } from '@/utils/dimensions'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, useAuth } from '@/context/authContext';

const dashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        console.log("dashboard ",id)
        if (id) setUserId(id);
        if (token) setToken(token);
      } catch (e) {
        console.error('Error loading userId:', e);
      } finally {
        setLoadingUser(false);
      }
    };
    loadUserId();
  }, []);
  console.log("userid", userId)
  const {
    data: bed,
    loading: bedLoading,
    error: bedError,
    refetch
  } = useFetch(() => {
    if (!userId || !token) return Promise.resolve([]);
      return fetchBed({ query: userId, token });
    
  });
  useEffect(() => {
    if (userId && token) {
      refetch(); 
    }
  }, [userId, token]);


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
        { bedLoading || loadingUser ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          /> ) : bedError ? (
            <Text>Error: {bedError?.message }</Text>
          ) : (

        <FlatList data={bed}
          renderItem={({ item }) => <BedCard {...item}  />}
          
          keyExtractor={(item) => item._id?.toString()}
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

export default dashboard



