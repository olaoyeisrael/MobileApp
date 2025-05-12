import { Slot, Stack, useRouter, useSegments } from "expo-router";
import './globals.css'
import { StatusBar, View } from "react-native";
import {AuthProvider, useAuth} from '../context/authContext'
import { useEffect } from "react";

// export default function RootLayout() {
//   return (
//   <>
//   {/* This is used in hidding the time and network */}
//   <StatusBar hidden={true} />
//   <Stack>
//   {/* <Stack.Screen 
//     name="signup"
//     options={{
//       headerShown: false
//     }}
    
//     />
//     <Stack.Screen
//     name= "login"
//     options={{
//       headerShown: false
//      }} /> */}
//     <Stack.Screen 
//     name="(tabs)"
//     options={{
//       headerShown: false
//     }}
//     />
//     {/* <Stack.Screen 
//     name="movies/[id]"
//     options={{
//       headerShown: false
//     }}
//     /> */}
//   </Stack> 
//   </>
//   );

//   // return(
//   //   <View className="flex-1">
//   //     <Slot />
//   //   </View>
//   // )
// }
const MainLayout=()=>{
  const {isAuthenticated} = useAuth()
  const segment = useSegments()
  const router = useRouter()
  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;
  
    const inApp = segment[0] === '(tabs)';
  
    requestAnimationFrame(() => {
      if (isAuthenticated && !inApp) {
        router.replace('/(tabs)/dashboard');
      } else if (!isAuthenticated && segment[0] !== 'welcome') {
        router.replace('/welcome');
      }
    });
  }, [isAuthenticated]);

  // useEffect(()=>{
  //   if (typeof isAuthenticated == 'undefined') return;
  //   const inApp = segment[0]=='(tabs)';
  //   if (isAuthenticated && !inApp){
  //     router.replace('/(tabs)/dashboard');
  //   }
  //   else if (isAuthenticated == false){
  //     router.replace('/welcome')
  //   }
  // }, [isAuthenticated])
    return <Slot />
}

export default function RootLayout() {
  // return(
  //       <View className="flex-1">
  //         <Slot />
  //       </View>
  //     )

  return(
    <AuthProvider>
      <MainLayout/>
    </AuthProvider> 
  )
}

