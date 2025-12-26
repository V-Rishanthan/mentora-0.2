import { router } from "expo-router";
import { ArrowLeft, LogOut, Mail, Users } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/authContext";

export default function UserScreen() {
  const user = {
    name: "Prashandh",
    role: "React Native Developer",
    email: "jprashandh@gmail.com",
    gender: "Male",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
    joinDate: "Joined March 2024",
    avatar: require("../../assets/images/profile.jpg"),
  };

  const courses = [
    "React Full Course",
    "UI & UX Design",
    "Desktop Application Development",
    "Mobile App Development",
    "Backend with Node.js",
    "Database Design",
  ];

const { logout } = useAuth();

const handleLogOut = async () => {
  try {
    await logout();
  } catch (error) {
    console.log("Logout error:", error);
  }
};

  



  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="pt-12 px-6">
        
        <View className="flex-row items-center justify-between mb-8 w-full">
          {/* Left side */}
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/20 w-10 h-10 rounded-full items-center justify-center mr-4"
            >
              <ArrowLeft size={22} color="white" />
            </TouchableOpacity>

            <Text className="text-2xl font-outfit-bold text-white">
              Profile
            </Text>
          </View>

          {/* Right side (Logout) */}
          <TouchableOpacity onPress={handleLogOut} className="flex-row items-center bg-white/20 px-3 py-2 rounded-lg">
            <Text className="text-white mr-2 font-semibold">Logout</Text>
            <LogOut size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View className="items-center mb-6">
          <Image
            source={user.avatar}
            className="w-28 h-28 rounded-full border-4 border-white mb-4"
            resizeMode="cover"
          />
          <Text className="text-2xl font-outfit-bold text-WHITE">
            {user.name}
          </Text>
          <Text className="text-base font-outfit-medium text-WHITE/90 mt-1">
            {user.role}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-white rounded-t-[40px] pt-8 px-6">
        <ScrollView>
          {/* Personal Details */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-0.5 bg-primary mr-3" />
              <Text className="text-xl font-outfit-bold text-grayPro-800">
                Personal Details
              </Text>
            </View>

            <View className="space-y-4">
              <DetailItem
                icon={<Mail size={20} color="#4F46E5" />}
                label="Email"
                value={user.email}
              />
              <DetailItem
                icon={<Users size={20} color="#10B981" />}
                label="Gender"
                value={user.gender}
              />
            </View>
          </View>

          {/* My Courses */}
          <View className="mb-10">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-0.5 bg-primary mr-3" />
              <Text className="text-xl font-outfit-bold text-grayPro-800">
                My Courses
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {courses.map((course, index) => (
                <View
                  key={index}
                  className="bg-primary/5 px-4 py-3 rounded-full"
                >
                  <Text className="text-primary font-outfit-medium">
                    {course}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// Helper component for detail items
function DetailItem({ icon, label, value }) {
  return (
    <View className="flex-row items-center p-4 bg-grayPro-50 rounded-xl">
      <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-4 shadow-sm">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-outfit-medium text-grayPro-500">
          {label}
        </Text>
        <Text className="text-base font-outfit-semibold text-grayPro-800">
          {value}
        </Text>
      </View>
    </View>
  );
}
