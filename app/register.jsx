import { useRouter } from "expo-router";
import { BookOpen, Eye, Mail, User, UsersRound } from "lucide-react-native";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "./components/Button";
import SectionTitle from "./components/SectionTitle";

export default function register() {
  const router = useRouter();

  const handlelogin = () => {
    router.push("./registerTeachers");
  };

  return (
    <View className="flex-1 px-6 mt-5 relative bg-secondary">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View className="w-full ">
        <Image
          source={require("../assets/images/logo-2.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>

      {/* Title Content */}

      <SectionTitle
        hero={"Create Account"}
        sub={"Register to Start your Exciting Learning Process"}
      />

      {/* input field */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="px-8"
      >
        {/* Full name*/}
        <View className="flex-row items-center rounded-xl border border-light px-4 mb-5">
          <TextInput
            className="flex-1 text-gray/15 text-base py-4"
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
          />
          <User size={18} color={"#c7c7c8"} />
        </View>
        {/* Email*/}
        <View className="flex-row items-center rounded-xl border border-light px-4  mb-5">
          <TextInput
            className="flex-1 text-gray/15 text-base py-4"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
          />
          <Mail size={18} color={"#c7c7c8"} />
        </View>
        {/* Password*/}
        <View className="flex-row items-center rounded-xl border border-light px-4 mb-5">
          <TextInput
            className="flex-1 text-gray text-base py-4"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            textContentType="password"
            secureTextEntry={true}
          />
          <Eye size={18} color={"#c7c7c8"} />
        </View>
        {/* Gender*/}
        <View className="flex-row items-center rounded-xl border border-light px-4 mb-5">
          <TextInput
            className="flex-1 text-gray text-base py-4"
            placeholder="Gender"
            placeholderTextColor="#9ca3af"
            textContentType="Gender"
          />
          <UsersRound size={18} color={"#c7c7c8"} />
        </View>
        {/* Subject Interest*/}
        <View className="flex-row items-center rounded-xl border border-light px-4 ">
          <TextInput
            className="flex-1 text-gray text-base py-4"
            placeholder="Subject Interest"
            placeholderTextColor="#9ca3af"
            textContentType="Gender"
          />
          <BookOpen size={18} color={"#c7c7c8"} />
        </View>

        <View className="mt-8">
          <Button text="Create a Account " onPress={handlelogin} />
          <Text className="text-base text-black text-center mt-4">
            Already have an account? Sign In
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* patterns */}

      <Image
        source={require("../assets/images/patterns.png")}
        className="absolute bottom-0 right-0 w-56 h-56"
        resizeMode="contain"
      />
    </View>
  );
}
