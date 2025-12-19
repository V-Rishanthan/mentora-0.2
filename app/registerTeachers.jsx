import { useRouter } from "expo-router";
import { Eye, Mail, User } from "lucide-react-native";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
  View,
} from "react-native";
import Button from "./components/Button";
import SectionTitle from "./components/SectionTitle";

export default function registerTeachers() {
  const router = useRouter();

  const handleClick = () => {
    router.push("./registerTeachers_2");
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
        sub={"Register to Start your Exciting Teaching Process"}
      />

      {/* input field */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="px-8"
      >
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

        <View className="mt-8">
          <Button text="Continue " onPress={handleClick} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
