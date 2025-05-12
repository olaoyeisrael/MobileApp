import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
import { hp, wp } from '@/utils/dimensions'
import Loading from '@/components/Loading'



const index = () => {
  const router = useRouter()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const {login} = useAuth()
  const [loading, setLoading] = useState<boolean>(false)


  const handleLogin = async()=>{
    if (!emailRef.current || !passwordRef.current){
      Alert.alert('Sign In', 'Please fill all the fields');
      return;
    }
    setLoading(true)
    let response = await login(emailRef.current, passwordRef.current)
    setLoading(false);
    console.log('got result: ', response)
    
    if(!response.success){
      Alert.alert('Sign In', response.msg)
      }
  }
  return (
    <SafeAreaView className=''>
    <View className=''>
      <View className=''>
      <Image
              source={images.logoImage}
              className="w-150 h-150 mx-auto mt-[39px]"
              // resizeMode="cover"
            />
        </View>
<View className='items-center justify-center mt-[20px]'>
    <View>
        <Text className='text-greenP text-[24px] font-bold'style={{fontFamily:"Nunito"}}> Welcome Back!</Text>
    </View>
    <Text className='text-[#6E6E6E] mt-[8px]' style={{fontFamily:"Inter"}}>Login to your account</Text>
</View>

<View className='mt-[30px] mx-[18px]'>
<View className="pl-[15px] bg-greenL rounded-md h-[50px]">
      <TextInput
        placeholder='Email address'
        // value={value}
        onChangeText={value=> emailRef.current=value}
        className="flex-1 ml-2 text-black"
        placeholderTextColor="#A8B5DB"
      />
       </View>

<View className="mt-[24px] pl-[15px] bg-greenL rounded-md h-[50px]">
      <TextInput
        placeholder='Password'
        onChangeText={value=> passwordRef.current=value}
        // value={value}
        // onChangeText={onChangeText}
        secureTextEntry
        className="flex-1 ml-2 text-black"
        placeholderTextColor="#A8B5DB"
      />
</View>

       <View className='mt-[15px] flex-row justify-between'>
      <Text className='text-[#817E7E] text-[13px]' style={{fontFamily:"Inter"}}>Remember me</Text>
      <Text className='text-[#817E7E] text-[13px]' style={{fontFamily:"Inter"}}>Forgot Password</Text>
       </View>
</View>


<View className='mt-[60px] mx-[20px]'>
<View>
{
      loading?(
        <View className='flex-row justify-center'>
          <Loading size={hp(8)} /> 
        </View>

      ):
      (<TouchableOpacity 
        className="h-50 w-150 left-0 right-0 mx-5 bg-[#4CAF50] rounded-lg py-3.5 items-center justify-center z-50"
        onPress={handleLogin}
      >
        <Text className="text-white  text-xl" style={{fontFamily:"Inter"}}>Login</Text>
      </TouchableOpacity >)}
</View>
      <Text className='mt-[12px] text-center' style={{fontFamily:"Inter"}}>Don’t have an account? <Link href={'/signup'} className='text-greenP'>Sign Up</Link></Text>
      </View>
</View>
      
 
  </SafeAreaView>
  )
}

export default index


