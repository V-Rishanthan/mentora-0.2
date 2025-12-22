import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CourseDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log("Received params:", params);

  // Parse the stringified course data
  let course = null;
  try {
    if (params.course && typeof params.course === "string") {
      course = JSON.parse(params.course);
      console.log("Parsed course:", course.title);
    }
  } catch (error) {
    console.error("Error parsing course:", error);
  }

  if (!course) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-WHITE">
        <Text className="text-xl text-grayPro-800">
          Course data not available
        </Text>
        <TouchableOpacity
          className="mt-6 bg-primary px-6 py-3 rounded-lg"
          onPress={() => router.back()}
        ></TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    // Clean version with exact grayPro mapping
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Hero Image */}
        <Image
          source={course.image}
          className="w-full h-56"
          resizeMode="cover"
        />

        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-12 left-4 bg-black/20 w-10 h-10 rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>

        {/* Content */}
        <View className="px-5 pt-6">
          {/* Category & Price */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="bg-green-50 px-3 py-1.5 rounded-full">
              <Text className="text-green-800 text-sm font-outfit-medium">
                {course.category}
              </Text>
            </View>
            
          </View>

          {/* Title */}
          <Text className="text-2xl font-outfit-bold text-grayPro-800 mb-3">
            {course.title}
          </Text>

          {/* Stats */}
          <View className="flex-row justify-between items-center space-x-4 mb-6">
            <View className="flex-row items-center">
              <Star size={16} color="#FBBF24" />
              <Text className="font-outfit-medium ml-1 text-grayPro-700">
                {course.rating}
              </Text>
            </View>
           
            <Text className="text-grayPro-600 font-outfit-regular">
              {course.duration}
            </Text>
          </View>

          {/* Instructor */}
          <View className="flex-row items-center mb-8 p-4 bg-primary/10 rounded-lg">
            <Image
             source={course.lecturerPic}
              className="w-20 h-20 rounded-full  "
            />
            <View className="ml-3">
              <Text className="font-outfit-semibold text-grayPro-800">
                Mohamed Nuhman
              </Text>
              <Text className="text-grayPro-500 text-sm font-outfit-regular">
                Software Engineer
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-grayPro-600 mb-8 leading-relaxed font-outfit-regular">
            {course.description}
          </Text>

          {/* Key Features */}
          <View className="mb-8">
            <Text className="text-lg font-outfit-semibold text-grayPro-800 mb-3">
              Course Features
            </Text>
            <View className="space-y-2">
              {[
                "Interactive video lessons",
                "Practical coding exercises",
                "Real-world projects",
                "Lifetime access to updates",
                "Certificate upon completion",
              ].map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="w-2 h-2 bg-primary rounded-full mr-3"></View>
                  <Text className="text-grayPro-600 font-outfit-regular">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Chat Now Button */}
          <TouchableOpacity
            className="bg-primary py-4 rounded-xl mb-6"
            activeOpacity={0.9}
          >
            <Text className="text-white text-center text-lg font-outfit-semibold">
             Chat Now
            </Text>
          </TouchableOpacity>

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
