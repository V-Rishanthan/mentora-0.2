import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CourseDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log(
    "Received params string:",
    params.course?.substring(0, 100) + "..."
  );

  // Parse the stringified course data
  let course = null;
  try {
    if (params.course && typeof params.course === "string") {
      course = JSON.parse(params.course);
      console.log("Successfully parsed course:", {
        subjectName: course.subjectName,
        category: course.category,
        hasThumbnail: !!course.thumbnail,
        thumbnailType: typeof course.thumbnail,
      });
    }
  } catch (error) {
    console.error("Error parsing course:", error);
    console.error("Raw course string:", params.course);
  }

  if (!course) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl text-grayPro-800 mb-4">
          Course data not available
        </Text>
        <TouchableOpacity
          className="mt-6 bg-primary px-6 py-3 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-outfit-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Helper function to get image source
  const getImageSource = () => {
    if (!course.thumbnail) {
      return require("../assets/images/course/course-2.png");
    }

    // Check what type of thumbnail we have
    console.log("Processing thumbnail:", {
      value: course.thumbnail?.substring?.(0, 50),
      type: typeof course.thumbnail,
      isObject: typeof course.thumbnail === "object",
    });

    // If thumbnail is a string (base64 or URL)
    if (typeof course.thumbnail === "string") {
      if (course.thumbnail.startsWith("data:image")) {
        // It's a base64 string
        console.log("Using base64 thumbnail");
        return { uri: course.thumbnail };
      } else if (course.thumbnail.startsWith("http")) {
        // It's a URL
        console.log("Using URL thumbnail");
        return { uri: course.thumbnail };
      } else {
        // Assume it's a path string
        console.log("Using path thumbnail");
        return { uri: course.thumbnail };
      }
    }

    // If thumbnail is an object with uri property
    if (
      course.thumbnail &&
      typeof course.thumbnail === "object" &&
      course.thumbnail.uri
    ) {
      console.log("Using object thumbnail with uri");
      return { uri: course.thumbnail.uri };
    }

    console.log("Using fallback thumbnail");
    return require("../assets/images/course/course-2.png");
  };

  const imageSource = getImageSource();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View className="relative">
          <Image
            source={imageSource}
            className="w-full h-64"
            resizeMode="cover"
          />

          {/* Back Button */}
          <TouchableOpacity
            className="absolute top-12 left-4 bg-black/30 w-10 h-10 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Dark overlay at bottom of image */}
          <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </View>

        {/* Content */}
        <View className="px-5 pt-6 ">
          {/* Category & Price */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <Text className="text-green-800 text-sm font-outfit-medium">
                {course.category || "General"}
              </Text>
            </View>
          </View>

          {/* Title - Use subjectName from your data */}
          <Text className="text-2xl font-outfit-bold text-grayPro-800 mb-3">
            {course.subjectName || course.title || "Course Title"}
          </Text>

          {/* Stats */}
          <View className="flex-row items-center gap-3 space-x-6 mb-6">
            <View className="flex-row items-center">
              <Clock size={18} color="#6B7280" />
              <Text className="font-outfit-medium ml-2 text-grayPro-700">
                {course.duration || "10 hours"}
              </Text>
            </View>

            <View className="flex-row items-center">
              <BookOpen size={18} color="#6B7280" />
              <Text className="font-outfit-medium ml-2 text-grayPro-700">
                {course.lessons || "24"} lessons
              </Text>
            </View>
          </View>

          {/* Instructor */}
          <View className="flex-row items-center mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
            {course.lecturerPic ? (
              <Image
                source={{ uri: course.lecturerPic }}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center">
                <User size={24} color="#4F46E5" />
              </View>
            )}
            <View className="ml-4 flex-1">
              <Text className="font-outfit-semibold text-lg text-grayPro-800">
                {course.teacherName || course.instructor || "Mohamed Nuhman"}
              </Text>
              <Text className="text-grayPro-500 text-sm font-outfit-regular mt-1">
                {course.teacherTitle || "Software Engineer"} ·{" "}
                {course.experience || "5+ years experience"}
              </Text>
              <Text className="text-primary text-xs font-outfit-medium mt-2">
                ⭐ {course.instructorRating || "4.9"} Instructor Rating
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text className="text-xl font-outfit-semibold text-grayPro-800 mb-4">
              About This Course
            </Text>
            <Text className="text-grayPro-600 leading-relaxed font-outfit-regular text-base">
              {course.description || "No description available."}
            </Text>
          </View>

          {/* Display Subjects if available */}
          {course.subjects && course.subjects.length > 0 && (
            <View className="mb-8">
              <Text className="text-xl font-outfit-semibold text-grayPro-800 mb-4">
                Subjects Covered
              </Text>
              <View className="flex-row flex-wrap">
                {course.subjects.map((subject, idx) => (
                  <View
                    key={idx}
                    className="bg-gray-100 px-3 py-2 rounded-lg mr-2 mb-2"
                  >
                    <Text className="text-gray-600 font-outfit-medium text-sm">
                      {subject}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Key Features */}
          {/* <View className="mb-8">
            <Text className="text-xl font-outfit-semibold text-grayPro-800 mb-4">
              Course Features
            </Text>
            <View className="space-y-3">
              {course.features || [
                "Interactive video lessons",
                "Practical coding exercises",
                "Real-world projects",
                "Lifetime access to updates",
                "Certificate upon completion",
              ].map((item, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></View>
                  <Text className="text-grayPro-600 font-outfit-regular flex-1">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View> */}

          {/* Course Curriculum Preview */}
          <View className="mb-8">
            <Text className="text-xl font-outfit-semibold text-grayPro-800 mb-4">
              Course Curriculum
            </Text>
            <View className="space-y-2">
              {course.subjects.map((lesson, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between py-3 px-4 bg-grayPro-50 rounded-lg"
                >
                  <View className="flex-row items-center">
                    <View className="w-6 h-6 bg-primary/10 rounded items-center justify-center mr-3">
                      <Text className="text-primary text-xs font-outfit-semibold">
                        {index + 1}
                      </Text>
                    </View>
                    <Text className="text-grayPro-700 font-outfit-regular">
                      {lesson}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
          className="bg-primary py-4 rounded-xl mb-10 items-center"
          activeOpacity={0.9}
         
        >
          <Text className="text-white text-lg font-outfit-semibold">
            Chat Now
          </Text>
        </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
