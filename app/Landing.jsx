import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("./welcome");
    }, 3000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-80 h-auto">
        <Image
          source={require("../assets/images/logo-2.png")}
          className="w-full  "
          resizeMode="contain"
        />
      </View>

      <Text className="text-lg font-semibold  text-gray">
        AI-Powered Free Live Learning Platform
      </Text>
    </View>
  );
}
