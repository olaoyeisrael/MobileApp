import { Stack } from "expo-router";
import './globals.css'
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
  <>
  {/* This is used in hidding the time and network */}
  <StatusBar hidden={true} />
  <Stack>
  {/* <Stack.Screen 
    name="signup"
    options={{
      headerShown: false
    }}
    
    />
    <Stack.Screen
    name= "login"
    options={{
      headerShown: false
     }} /> */}
    <Stack.Screen 
    name="(tabs)"
    options={{
      headerShown: false
    }}
    />
    {/* <Stack.Screen 
    name="movies/[id]"
    options={{
      headerShown: false
    }}
    /> */}
  </Stack> 
  </>
  );
}
