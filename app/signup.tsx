import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
import Loading from '../components/Loading'
import { hp } from '@/utils/dimensions'


const signup = () => {
  const router = useRouter()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const name = useRef("")
  const [loading, setLoading] = useState<boolean>(false)
  const {register} = useAuth();

  const handleSignUp = async()=>{
      if (!name.current || !emailRef.current || !passwordRef.current
      ){
        Alert.alert('Sign In', 'Please fill all the fields');
        return;
      }

      setLoading(true)
      let response = await register(name.current, emailRef.current, passwordRef.current)
      setLoading(false);
      console.log('got result: ', response)

      if(!response.success){
        Alert.alert('Sign Up', response)
      }
    }

  return (
    // <SafeAreaView className=''>
    <SafeAreaView  className=''>
      <Image
              source={images.logoImage}
              className="w-150 h-150 mx-auto mt-[39px]"
              // resizeMode="cover"
            />
  
    <View className='mt-[20px] mx-[18px]'> 
    <View className='mx-[14.5px] items-center'>
       <Text className='text-greenP text-2xl' style={{fontFamily:"Nunito"}}>Register</Text>
       <Text className='font-normal text-[#6E6E6E] mt-[8px]' style={{fontFamily:"Inter"}}>Create your new account</Text>
        </View> 


    <View className='mt-[30px]' >
    <View className="bg-greenL rounded-md h-[50px]">
      <TextInput
        placeholder='Name'
        // value={value}
        // onChangeText={onChangeText}
        onChangeText={value=> name.current=value}
        className="flex-1 ml-[15px] text-black"
        placeholderTextColor="#A8B5DB"
      />
       </View>

       <View className="mt-[24px]  bg-greenL rounded-md h-[50px]">
      <TextInput
        placeholder='Email address'
        // value={value}
        // onChangeText={onChangeText}
        onChangeText={value=> emailRef.current=value}
        className="flex-1 text-black ml-[15px]"
        placeholderTextColor="#A8B5DB"
      />
</View>


<View className="mt-[24px] bg-greenL rounded-md h-[50px]">
      <TextInput
        placeholder='Password'
        // value={value}
        // onChangeText={onChangeText}
        className="flex-1 text-black ml-[15px]"
        secureTextEntry
        onChangeText={value=> passwordRef.current=value}
        placeholderTextColor="#A8B5DB"
      />
</View>
    <View className='mt-[15px] text-[13px] justify-center'>
        <Text style={{fontFamily:"Inter"}}>Remember me</Text>
        </View>
</View>

<View className='mt-[30px]'>
  <View>
    {
      loading?(
        <View className='flex-row justify-center'>
          <Loading size={hp(8)} />
        </View>

      ):
      (<TouchableOpacity
        className="h-50 left-0 right-0  bg-[#4CAF50] rounded-lg py-3.5 items-center justify-center z-0"
        onPress={handleSignUp}>
                <Text className="text-white  text-xl" style={{fontFamily:"Inter"}}>Sign Up</Text>
      </TouchableOpacity>)
    }
  </View>

<Text className='mt-[12px] font-normal text-[12px] text-center' style={{fontFamily:"Inter"}}>Already have an account? <Link href={'/login'} className='text-greenP'>Login</Link></Text>
</View>


</View>
      
 
    </SafeAreaView>
  )
}

export default signup







