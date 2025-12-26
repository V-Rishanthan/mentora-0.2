import { router } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatDetailsScreen() {
  const messages = [
    { id: 1, text: 'Hello! How can I help you?', time: '10:00 AM', sender: 'them' },
    { id: 2, text: 'I need help with the course.', time: '10:02 AM', sender: 'me' },
    { id: 3, text: 'Sure! What do you need help with?', time: '10:05 AM', sender: 'them' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-WHITE">
      {/* Simple Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-grayPro-200">
        <TouchableOpacity className="mr-4" onPress={router.back()}>
          <ArrowLeft size={24} color="#444546" />
        </TouchableOpacity>
        
        <View className="flex-row items-center flex-1">
          
          
          <View className="ml-3">
            <Text className="font-outfit-semibold text-grayPro-800">Alex Johnson</Text>
            <Text className="text-grayPro-500 text-xs">React Native Mentor</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 p-4">
        {messages.map(message => (
          <View
            key={message.id}
            className={`mb-3 ${message.sender === 'me' ? 'items-end' : 'items-start'}`}
          >
            <View
              className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                message.sender === 'me'
                  ? 'bg-primary'
                  : 'bg-grayPro-100'
              }`}
            >
              <Text
                className={`font-outfit-regular ${
                  message.sender === 'me' ? 'text-WHITE' : 'text-grayPro-800'
                }`}
              >
                {message.text}
              </Text>
            </View>
            <Text className="text-grayPro-400 text-xs mt-1">
              {message.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Simple Input */}
      <View className="px-4 py-3 border-t border-grayPro-100">
        <View className="flex-row items-center bg-grayPro-100 rounded-full px-4">
          <TextInput
            className="flex-1 py-3 text-grayPro-800 font-outfit-regular"
            placeholder="Message..."
            placeholderTextColor="#878989"
            editable={false}
          />
          <TouchableOpacity className="p-2">
            <Send size={20} color="#8681FB" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}