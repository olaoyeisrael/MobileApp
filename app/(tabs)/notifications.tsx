import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import { wp, hp } from '@/utils/dimensions'
const notifications = () => {
  return (
    <SafeAreaView className='bg-[#FFFFFF] flex-1' >
        
        <Image source={images.logoImage} className='w-[80px] h-[72px] object-contain' style={{marginLeft:wp(39)}}/>
        <View className='mx-auto' style={{width: wp(90)}}>

        
        <Text className='text-[16px]' style={{fontFamily:"Inter"}}>Notifications</Text>
        </View>
    </SafeAreaView>
  )
}

export default notifications