import { useState, useEffect } from "react";
import { useFonts } from 'expo-font'

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fontsLoaded] = useFonts({
    "Nunito" : require('./../assets/fonts/Nunito-Medium.ttf'),
    "Roman" : require('./../assets/fonts/Romanesco-Regular.ttf'),
    "Inter": require('./../assets/fonts/Inter-VariableFont_opsz,wght.ttf')
  })

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
      // setFont(fontsLoaded);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  // const [fontsLoaded] = useFonts({
  //   "Nunito" : require('./../../assets/fonts/Nunito-Medium.ttf') 
  // })
  // // if (!fontsLoaded){
  // //   return null;
  // // }
  // useEffect(()=>{
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync()
  //   }
  //   prepare()
  // },[])
  // if (!fontsLoaded) {
  //   return undefined;
  // }
  // else{
  //   SplashScreen.hideAsync()
  // }


  return { data, loading, error, refetch: fetchData, reset, fontsLoaded };
};

export default useFetch;