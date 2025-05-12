import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { wp, hp } from "@/utils/dimensions";

const BedCard = ({
  _id,
  name,
  macAddress,
}: Bed) => {
  return (
    <Link href={`/beds/${macAddress}`} asChild>
      <TouchableOpacity style={{width: wp(42)}} className="">
      <Text className="text-sm text-black mt-2 text-center" style={{fontFamily:"Nunito"}} numberOfLines={1}>
          {name}
        </Text>
        <Image
          source={images.bedImage}
          className="w-full h-[200px] rounded-lg"
          resizeMode="cover"
        />

      </TouchableOpacity>
    </Link>
  );
};

export default BedCard;