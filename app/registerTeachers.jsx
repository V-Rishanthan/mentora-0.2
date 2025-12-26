import { useRouter } from "expo-router";
import { Eye, Mail, User } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
  View
} from "react-native";
import { saveTeacherData } from "../utils/teacherRegistrationStore";
import Button from "./components/Button";
import SectionTitle from "./components/SectionTitle";

export default function registerTeachers() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
const handleContinue = async () => {
    // Validation
    if (!formData.username.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }
    
    if (!formData.email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    
    if (!formData.password || formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    
    try {
      // Save basic info to storage
      await saveTeacherData({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      
      // Navigate to next screen
      router.push("./registerTeachers_2");
    } catch (error) {
      Alert.alert("Error", "Failed to save data. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
            value={formData.username}
            onChangeText={(value) => handleChange("username", value)}
            className="flex-1 text-grayPro-800 text-base py-4"
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
          />
          <User size={18} color={"#c7c7c8"} />
        </View>
        {/* Email*/}
        <View className="flex-row items-center rounded-xl border border-light px-4  mb-5">
          <TextInput
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            className="flex-1 text-grayPro-800 text-base py-4"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
          />
          <Mail size={18} color={"#c7c7c8"} />
        </View>
        {/* Password*/}
        <View className="flex-row items-center rounded-xl border border-light px-4 mb-5">
          <TextInput
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            className="flextext-grayPro-800 text-base py-4"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            textContentType="password"
            secureTextEntry={true}
          />
          <Eye size={18} color={"#c7c7c8"} />
        </View>

        <View className="mt-8">
          <Button 
            text={loading ? "Saving..." : "Continue"} 
            onPress={handleContinue}
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
