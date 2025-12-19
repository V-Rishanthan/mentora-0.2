import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Button from './components/Button';

export default function WelcomeScreen() {

    const router = useRouter();

    const handleClick = ()=>{
        router.replace("./role")

    }

  return (
    <View className="flex-1 bg-white">
      {/* Hero Image Section */}
      <View className="flex-1 mt-10">
        <Image 
          source={require("../assets/images/welcome-img.jpeg")}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Gradient Overlay */}
        <View className="absolute bottom-0 left-0 right-0 h-1/2 " />
      </View>

      {/* Content Section */}
      <View className="px-6 pb-10 bg-[#fff]">
        {/* Main Heading */}
        <Text className="text-4xl font-bold  mb-2">
          Learn More & Improve 
         
        </Text>
         <Text className="text-4xl font-bold text-primary mb-2">Your Skills</Text>

        {/* Subtitle */}
        <Text className="text-lg mb-14 text-gray ">
          Join thousands of learners enhancing their skills with AI-powered live sessions
        </Text>

        {/* Get Started Button */}
       <Button text=" Get Started" onPress={handleClick}/>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="">Already have an account? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}