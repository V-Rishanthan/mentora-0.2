import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import Button from "./components/Button";
import SectionTitle from "./components/SectionTitle";

export default function RegisterTeachers() {

   const router = useRouter();
  
    const handleClick = () => {
      router.push("./teacherSubjectSuggestion");
    };

  return (
    <View className="flex-1 px-6 mt-5 bg-secondary">
      <View className="w-full ">
        <Image
          source={require("../assets/images/logo-2.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>
      {/* Title Content */}
      <SectionTitle
        hero={"Let’s Build Your Learning Profile"}
        sub={
          "Provide some quick information to unlock personalized courses and guidance."
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="px-8"
      >
        {/* Qualification */}
        <View className="flex-row items-center rounded-xl border border-light px-4  mb-5">
          <TextInput
            className="flex-1 text-gray/15 text-base py-4"
            placeholder="Qualification"
            placeholderTextColor="#9ca3af"
          />
        </View>
        {/*  Years of Experience*/}
        <View className="flex-row items-center rounded-xl border border-light px-4  mb-5">
          <TextInput
            className="flex-1 text-gray/15 text-base py-4"
            placeholder="Years of Experience"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
          />
        </View>
        {/* Specialization */}
        <View className="flex-row items-center rounded-xl border border-light px-4  mb-5">
          <TextInput
            className="flex-1 text-gray/15 text-base py-4"
            placeholder="Specialization"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Bio Field */}
        <View className="rounded-xl border border-light px-4 mb-5">
          <TextInput
            className="text-gray/15 text-base py-4 min-h-32"
            placeholder="Tell us about yourself, your teaching philosophy, and what makes you unique..."
            placeholderTextColor="#9ca3af"
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            style={{ minHeight: 128 }}
          />
        </View>
        {/* button */}
        <View className="mt-8">
          <Button text="Continue " onPress={handleClick} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
