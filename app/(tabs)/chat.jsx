
import { useRouter } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ChatScreen() {
  // Users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      role: "React Native Mentor",
      lastMessage: "See you in tomorrow's class!",
      time: "10:30 AM",
      unread: 2,
      online: true,
      avatar: require("../../assets/images/profile.jpg"),
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "UI/UX Instructor",
      lastMessage: "Submitted the assignment",
      time: "Yesterday",
      unread: 0,
      online: true,
      avatar: require("../../assets/images/profile.jpg"),
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Python Expert",
      lastMessage: "Check the updated syllabus",
      time: "2 days ago",
      unread: 0,
      online: false,
      avatar: require("../../assets/images/profile.jpg"),
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Web Dev Coach",
      lastMessage: "Great progress on the project!",
      time: "3 days ago",
      unread: 1,
      online: true,
      avatar: require("../../assets/images/profile.jpg"),
    },
  ]);

  const router = useRouter();
  const handleNavigate = () => {
   router.push("/ChatDetailsScreen");
  }
   
    
    
  

  return (
    <SafeAreaView className="flex-1 bg-WHITE">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity className="mr-4" >
            <ArrowLeft size={24} color="#444546" />
          </TouchableOpacity>
          <Text className="text-xl font-outfit-bold text-grayPro-800">
            Messages
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-grayPro-100 rounded-xl px-4 py-3">
          <Search size={20} color="#878989" />
          <TextInput
            className="flex-1 ml-3 text-grayPro-800 font-outfit-regular"
            placeholder="Search messages..."
            placeholderTextColor="#878989"
          />
        </View>
      </View>

      {/* All Messages */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-outfit-semibold text-grayPro-800 mb-4">
          Recent Messages
        </Text>

        {users.map((user) => (
          
          <TouchableOpacity
            key={user.id}
            onPress={handleNavigate}
            className="flex-row items-center py-4"
            activeOpacity={0.7}
          >
            {/* User Avatar */}
            <View className="relative">
              <Image
                source={user.avatar}
                className="w-14 h-14 rounded-full"
                resizeMode="cover"
              />
              {user.online && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-WHITE" />
              )}
            </View>

            {/* Message Content */}
            <View className="flex-1 ml-3">
              <View className="flex-row justify-between items-start">
                <Text className="font-outfit-semibold text-grayPro-800">
                  {user.name}
                </Text>
                <Text className="text-grayPro-500 text-xs font-outfit-regular">
                  {user.time}
                </Text>
              </View>
              <Text className="text-grayPro-500 text-sm font-outfit-regular mt-1">
                {user.role}
              </Text>
              <Text
                className="text-grayPro-600 text-sm font-outfit-regular mt-1"
                numberOfLines={1}
              >
                {user.lastMessage}
              </Text>
            </View>

            {/* Unread Badge */}
            {user.unread > 0 && (
              <View className="bg-primary w-6 h-6 rounded-full items-center justify-center ml-2">
                <Text className="text-WHITE text-xs font-outfit-semibold">
                  {user.unread}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* New Message Button
      <View className="px-4 py-4">
        <TouchableOpacity className="bg-primary py-4 rounded-xl items-center">
          <Text className="text-WHITE text-lg font-outfit-semibold">
            New Message
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}