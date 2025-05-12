import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import { wp, hp } from '@/utils/dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchAlerts } from '@/services/api'

interface NotificationInfoProps {
  label: number;
  value?: string | number | null;
  date?: number
}

const NotificationInfo = ({ label, value, date }: NotificationInfoProps) => (

<View className='size-fit border-b-violet-100 border-double border-b  '>
            <View className='ml-[24px] '>
              {/* Image will be here */}
              <View className='mb-[10.5px]'>
                <Text>{label}</Text>
                <Text style={{fontFamily: "Inter"}} className='text-[#6E6E6E]'>{value}</Text>
                <Text style={{fontFamily: "Inter"}} className='text-[#6E6E6E]'>{date}</Text>
              </View>

            </View>
            </View>
          
);
const notifications = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const storedToken = await AsyncStorage.getItem('token');

        if (id && storedToken) {
          setUserId(id);
          setToken(storedToken);

          const alertData = await fetchAlerts({ userId: id, token: storedToken });
          setAlerts(alertData);
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };

    loadAlerts();
  }, []);
  return (
    <SafeAreaView className='bg-[#FFFFFF] flex-1' >
        
        <Image source={images.logoImage} className='w-[80px] h-[72px] object-contain' style={{marginLeft:wp(39)}}/>
        <View className='mx-auto' style={{width: wp(90)}}>

        <Text className='text-[16px] mt-[12px]' style={{fontFamily:"Inter"}}>Notifications</Text>
      
        <View className='mt-[13px]'>
        <ScrollView className='h-[568px]' >
            <View className='flex-col gap-[17px] mt-[19px]'>
            {alerts.map((alert) => (
              <NotificationInfo
                  key={alert._id}
                  label={alert.bedId}
                  value={alert.message} 
                  // date={new Date(alert.createdAt).toLocaleString()} />
                  date = {alert.date}/>
                  ))}
          </View>
          </ScrollView>
          </View>
        
        </View>
  
    </SafeAreaView>
  )
}

export default notifications