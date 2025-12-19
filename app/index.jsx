import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";
import "../global.css";

export default function Index() {

  const router = useRouter()

  useEffect(()=>{
      setTimeout(()=>{
        router.push("./Landing")
      },2000)
  },[])

  return (
    <View className="flex-1  items-center justify-center bg-secondary">
      <Image
        source={require("../assets/images/logo-1.jpeg")}
        className="w-64 h-64"
      />
    </View>
  );
}
