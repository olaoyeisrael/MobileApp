import { Redirect, Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { hp, wp } from "@/utils/dimensions";
import { HapticTab } from "@/app-example/components/HapticTab";

const TabIcon = ({ focused, icon, title }: any)=> {
    // const session = false
    // return !session ? <Redirect href={'/login'}/> :
    if (focused) {
      return (
        <View className="bg-[#4CAF501A] flex flex-row w-full flex-1 justify-center mt-[40px] items-center rounded-xl overflow-hidden" style={{minWidth: wp(26), minHeight: hp(4)}}>
          <Image source={icon} tintColor="#151312" className="h-[24px] w-[24px]" />
          <Text className="text-[#4CAF50] text-xs font-medium  ml-2" style={{fontFamily:"Inter"}}>
            {title}
          </Text>
        </View>
   
      );
    }
  
    return (
      <View className="size-full justify-center items-center w-[34px] h-[34px]" style={{marginTop:hp(4)}}>
        <Image source={icon} tintColor="#A8B5DB" className="h-[24px] w-[24px]"  />
      </View>
    );
  }
  
  export default function _layout() {
    return (
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarButton: HapticTab,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderRadius: 0,
            // marginHorizontal: 38,
            // marginBottom: 8,
            height: hp(9.5),
            position: "absolute",
            overflow: "hidden",
            borderWidth: 0,
            // borderColor: "#FFFFFF",
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "dashboard",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title="Dashboard" />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.notification} title="Notifications" />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.settings} title="Settings" />
            ),
          }}
        />
  
       
  
        
        {/* <Tabs.Screen
          name=""
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            ),
          }}
        /> */}
  
        
      </Tabs>
    );
  }