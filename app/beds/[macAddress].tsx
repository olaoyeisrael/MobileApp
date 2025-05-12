// export const options = {
//   title: 'Bed Details',
//   headerShown: true,
// };

import {
    View,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
  
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchBedDetails } from "@/services/api";
import { images } from "@/constants/images";
import { wp } from "@/utils/dimensions";
  
  interface BedInfoProps {
    label: string;
    value?: string | number | null | boolean;
  }
  
  const BedInfo = ({ label, value }: BedInfoProps) => (
    <View className="flex-row items-start mt-5">
      <Text className="text-[14px] font-normal text-[#6E6E6E] " style={{fontFamily: "Inter"}}>{label}</Text>
      <Text className="text-[14px] font-normal text-[#6E6E6E] ml-[5px]" style={{fontFamily: "Inter"}}>
        {value}
      </Text>
    </View>
  );

  
  const Details = () => {
    const router = useRouter();
    const { _id } = useLocalSearchParams();
    const { macAddress } = useLocalSearchParams();

    const {
      data: bed,
      loading,
      error,
    } = useFetch(() => {
      if (!macAddress) return Promise.resolve(null);
      return fetchBedDetails(macAddress as string);
    });
    console.log(bed)

    if (loading) {
      return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      );
    }
    if (error || !bed) {
      return (
        <SafeAreaView>
          <Text>Failed to load bed details</Text>
        </SafeAreaView>
      );
    }
    const { name, macAddress: mac, lastTemperature, assigned } = bed;
    return(
      
      <SafeAreaView>
           <Image source={images.logoImage} className="mx-auto w-[80px] h-[90px] object-contain"/>
           <View className="flex-row justify-between " style={{width:wp(45.8), marginLeft:wp(5.12)}}>
            <TouchableOpacity onPress={router.back}><Image source={icons.arrowleft} className=""/>
            </TouchableOpacity>
            <View><Text className="font-medium text-[20px]" style={{fontFamily:'Nunito'}}>{name}</Text>
            <Text className="mt-[4px] text-[14px] text-[#817E7E]" style={{fontFamily: "Inter"}}>Added: May 2, 2024</Text>
            </View>
           </View>
           <View className="mt-[24px]" style={{marginHorizontal:wp(5.12)}}>
            <View>
              <Text className="text-[20px]" style={{fontFamily:"Nunito"}}>Bed Information</Text>
              <View>
                <BedInfo label="Temperature:" value={lastTemperature}/>
                <BedInfo label="Pressure:" value=""/>
                <BedInfo label="Assigned:" value={assigned ? "Yes" : "No"}/>
              </View>
            </View>
            
           </View>
              

   </SafeAreaView>
  )

  };
  
  export default Details;
