import { useRouter } from "expo-router";
import { ArrowLeft, EyeOff, Mail } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/authContext";
import Button from "./components/Button";

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login, selectedRole,logout } = useAuth();

  const handleSignUp = () => {
    selectedRole == "Student"
      ? router.push("./register")
      : router.push("./registerTeachers");
  };

  const handleLogout = async ()=>{
    try{
      await logout();
      console.log("Logout the app in login Page successful !")
    }catch(error){
      console.log("Logout error:", error);
    }

  }

  // assign the hooks
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    // get input value from the user and store it
    const email = emailRef.current;
    const password = passwordRef.current;

    // check if the both value valid
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      // use the contect hooks and pass the props
      const response = await login(email, password);

      if (!response.success) {
        Alert.alert("Login Failed", response.error);
      }
      // If success is true, your auth context should handle the navigation
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
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
            className="bg-white w-10 h-10 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} />
          </TouchableOpacity>

          {/* Right */}
          <View className="flex-row items-center">
            <Text className="text-WHITE text-[14px]">
              Don't have an account?{" "}
            </Text>

            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-WHITE font-semibold text-[14px]">
                Sign Up
              </Text>
            </TouchableOpacity>

            <Text> | </Text>

            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-WHITE font-semibold text-[14px]">
                LogOut
              </Text>
            </TouchableOpacity>
          </View>
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

          {selectedRole && (
            <View className="bg-green-50 w-32 px-3 py-1.5 rounded-full">
              <Text className="text-green-800 text-center text-sm font-outfit-medium">
                {selectedRole}
              </Text>
            </View>
          )}
        </View>
        <ScrollView>
          <View className="space-y-6 pb-6 mt-10">
            {/* Email Input */}
            <View className="flex-row items-center rounded-xl border border-light px-4">
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                className="flex-1 text-grayPro-800 text-base py-4"
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
              />
              <Mail className=" ml-3" size={18} color={"#c7c7c8"} />
            </View>
            {/* Password */}
            <View className="flex-row items-center  rounded-xl border border-light  px-4 mt-5">
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                className="flex-1 text-grayPro-800 text-base py-4"
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
              <EyeOff className=" ml-3" size={18} color={"#c7c7c8"} />
            </View>

            {/* Button */}
            {loading ? (
              <ActivityIndicator size="small" color="#8681FB" />
            ) : (
              <View className="mt-8">
                <Button text="Login" onPress={handleLogin} />
              </View>
            )}

            {/* Spacer */}
            <View className="h-10" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
