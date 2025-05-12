import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { wp, hp } from '@/utils/dimensions'
import { useAuth } from '@/context/authContext'
interface SettingsProps {
  img: ImageSourcePropType;
  title?: string | number | null;
  onPress?: () => void;
}

const SettingsCard = ({ img, title, onPress}: SettingsProps) =>(
  <TouchableOpacity onPress={onPress} >
  <View className='flex-row items-center gap-[8px]' style={{height:hp(7.1)}} >
    <Image source={img} />
    <Text className='text-[16px]' style={{fontFamily:"Inter"}}>{title}</Text>
  </View>
  </TouchableOpacity>
);

const settings = () => {
  const {logout} = useAuth();

  const handleSignOut = async ()=>{
    await logout();
  }
  return (
    <SafeAreaView className='bg-[#FFFFFF] flex-1' >
        <Image source={images.logoImage} className='w-[80px] h-[72px] object-contain' style={{marginLeft:wp(39)}}/>
        <View className=' mt-[23px] mx-auto flex-col' style={{width:wp(88)}}>
          {/* <Text className=''>Settings</Text>  */}
          <SettingsCard img={images.accountSetting} title='Account Settings'/>
          <SettingsCard img={images.notificationsImage} title='Nofications'/>
          <SettingsCard img={images.security} title='Privacy terms'/>
          <SettingsCard img={images.informationCircle} title='About us'/>
          <SettingsCard img={images.logOut} title='Logout' onPress={handleSignOut} />
        </View>
        
    </SafeAreaView>
  )
}

export default settings