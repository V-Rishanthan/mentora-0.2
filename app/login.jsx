import { useRouter } from "expo-router";
import { ArrowLeft, EyeOff, Mail } from "lucide-react-native";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./components/Button";

export default function LoginScreen() {

  const router = useRouter()

  const handleClick = ()=>{
        router.push("./register")

    }

  return (
    <View className="flex-1 bg-primary">
        <StatusBar
  translucent
  backgroundColor="transparent"
  barStyle="light-content"
/>
      {/* Top Section */}
      <View className="flex-1 flex-row  px-6 ">
       
        <View className="flex-row items-start justify-between w-full mt-20">
          {/* Left */}
          <TouchableOpacity
          onPress={() => router.back()}
           className="bg-white w-10 h-10 rounded-full items-center justify-center">
            <ArrowLeft size={22} />
          </TouchableOpacity>

          {/* Right */}
          <Text className="text-white text-[14px]">
            Don't have an account?
            <Text className="font-semibold"> Sign Up</Text>
          </Text>
        </View>
      </View>

      {/* White Card */}
      <View className=" h-2/3 bg-white mt-10 rounded-t-[40px] px-8 pt-10">
        <View>
          <Text className="text-4xl font-bold">Welcome Back</Text>
          <Text className="text-4xl font-bold mb-4">To Mentora</Text>

          <Text className="text-gray text-lg mb-3">
            Sign in to continue your learning journey
          </Text>
        </View>
        <ScrollView>
          <View className="space-y-6 pb-6 mt-10">
            {/* Email Input */}
            <View className="flex-row items-center rounded-xl border border-light px-4">
              <TextInput
                className="flex-1 text-gray/15 text-base py-4"
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
              />
              <Mail className=" ml-3" size={18} color={"#c7c7c8"} />
            </View>
            {/* Password */}
            <View className="flex-row items-center  rounded-xl border border-light  px-4 mt-5">
              <TextInput
                className="flex-1 text-gray/95 text-base py-4"
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
              />
              <EyeOff className=" ml-3" size={18} color={"#c7c7c8"} />
            </View>

            {/* Button */}
            <View className="mt-8">
              <Button text="Login" onPress={handleClick} />
            </View>
            {/* Spacer */}
            <View className="h-10" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
