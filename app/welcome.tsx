import { View, Text, ActivityIndicator, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { wp } from '@/utils/dimensions'
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface WelcomeProps {
  text: string;
  actions:() => void ;
  bgColor?: string;
  textColor?: string;
}



const WelcomeCard = ({text, bgColor, textColor , actions}: WelcomeProps) =>(
  
  <TouchableOpacity>
  <View className='items-center h-[50px] justify-center rounded-lg' style={{backgroundColor: bgColor, width:wp(79)}}>
    <Pressable onPress={actions} >
    <Text className='text-[20px]' style={{fontFamily:"Inter", color: textColor}}>{text}</Text>
    </Pressable>
  </View>
  </TouchableOpacity>
  // bg-[#4CAF5033]
);

const index = () => {
  const navigation = useNavigation<any>();
  const handleLogin = ()=>{
    navigation.navigate('login');
    }
  const handleSignUp =()=>{
    navigation.navigate('signup')
  }
  return (<SafeAreaView>
    <View className='flex-0 items-center mt-[15px]'> 
    <Image source={images.logoImage} className='h-[150px]'/>
    </View>
    <View className='items-center mt-[43px]'>
      <Text className='text-[40px] text-center font-extrabold text-[#4CAF50]' style={{fontFamily:"Nunito-Semi",
      marginHorizontal:wp(5.1), textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,}}>Best App for</Text>
         <Text className='text-[40px] text-center font-extrabold text-[#4CAF50]' style={{fontFamily:"Nunito-Semi",
      marginHorizontal:wp(5.1), textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,}}>Smarter Farming</Text>
    </View>
    <View className='flex-col mt-[96px] items-center gap-[24px]' style={{marginHorizontal:wp(11.6)}}>
      <WelcomeCard text='Login' bgColor='#4CAF5033' actions={handleLogin} textColor='#4CAF50' />
      <WelcomeCard text='Create an account' bgColor='#4CAF50' actions={handleSignUp} textColor='#FFFFFF'/>

    </View>
    
  </SafeAreaView>
  )
}

export default index