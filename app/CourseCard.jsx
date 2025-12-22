import { useRouter } from "expo-router";
import { Star, TimerReset } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CourseCard() {
  const router = useRouter(); // Initialize navigation
  const [coursesData, setCoursesData] = useState([
    {
      id: "1",
      title: "React Native Fundamentals",
      category: "Mobile Development",
      instructor: "John Doe",
      rating: 4.8,

      duration: "12h 30m",
       lecturerPic: require("../assets/images/lecturer.jpeg"),
      image: require("../assets/images/course/course-1.png"),
      description: "Learn to build mobile apps with React Native from scratch",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      category: "Web Development",
      instructor: "Jane Smith",
      rating: 4.9,

      duration: "15h 45m",
      lecturerPic: require("../assets/images/lecturer.jpeg"),
      image: require("../assets/images/course/course-2.png"),
      description: "Master advanced JavaScript concepts and patterns",
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      category: "Design",
      instructor: "Alex Johnson",
      rating: 4.7,

      duration: "10h 15m",
       lecturerPic: require("../assets/images/lecturer.jpeg"),
      image: require("../assets/images/course/course-3.png"),
      description:
        "Learn the fundamentals of user interface and experience design",
    },
    {
      id: "4",
      title: "Python for Data Science",
      category: "Data Science",
      instructor: "Michael Chen",
      rating: 4.6,

      duration: "18h 20m",
      lecturerPic: require("../assets/images/lecturer.jpeg"),
      image: require("../assets/images/course/course-4.png"),
      description: "Python programming for data analysis and visualization",
    },
    {
      id: "5",
      title: "Full Stack Web Development",
      category: "Web Development",
      instructor: "Sarah Wilson",
      rating: 4.9,
      lecturerPic: require("../assets/images/lecturer.jpeg"),
      duration: "25h 30m",

      image: require("../assets/images/course/course-5.png"),
      description: "Build complete web applications from frontend to backend",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(coursesData?.map((course) => course.category)),
    ];
    return ["All", ...uniqueCategories];
  }, [coursesData]);

  // Filter courses based on selected category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") {
      return coursesData;
    }
    return coursesData.filter((course) => course.category === selectedCategory);
  }, [coursesData, selectedCategory]);

  // Navigate to the CourseDetails page

  const handleCoursePress = (course) => {
    router.push(
      `/CourseDetails?course=${encodeURIComponent(JSON.stringify(course))}`
    );
  };

  // Function to render each course card
  const renderCourse = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 "
      activeOpacity={0.7}
      onPress={() => handleCoursePress(item)}
    >
      <View className="flex-row">
        {/* Course Image - Left side */}
        <View className="mr-4">
          <Image
            source={item.image}
            className="w-32 h-32 rounded-xl"
            resizeMode="cover"
          />
        </View>

        {/* Course Details - Right side */}
        <View className="flex-1">
          {/* Category */}
          <View className="self-start bg-green-50 px-3 py-1.5 rounded-full mb-2">
            <Text className="text-xs text-green-800 font-medium">
              {item.category}
            </Text>
          </View>

          {/* Course Title */}
          <Text
            className="font-outfit-regular text-base text-grayPro-800 mb-1"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          {/* Instructor */}
          <Text className="text-sm text-grayPro-500 font-outfit-semibold mb-2">
            By {item.instructor}
          </Text>

          {/* Rating & Students */}
          <View className="flex-row items-center mb-2">
            <View className="flex-row items-center mr-3">
              <Star size={16} color="#FBBF24" />
              <Text className="font-semibold text-grayPro-700 ml-1">
                {item.rating}
              </Text>
              <Text className="text-grayPro-500 text-xs ml-1">
                ({item.students})
              </Text>
            </View>

            {/* Duration */}
            <View className="flex-row items-center">
              <TimerReset size={16} color="#6B7280" />
              <Text className="text-grayPro-600 text-xs ml-1">
                {item.duration}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Categories Filter Section */}
      <View className="p-4 bg-WHITE rounded-xl">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-3 px-4 py-2 rounded-full ${
                selectedCategory === category ? "bg-primary" : "bg-grayPro-100"
              }`}
              onPress={() => {
                setSelectedCategory(category);
              }}
            >
              <Text
                className={`font-medium font-outfit-regular ${
                  selectedCategory === category
                    ? "text-WHITE"
                    : "text-grayPro-600"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filter Info */}
        <Text className="text-grayPro-600 text-sm font-outfit-regular">
          Showing {filteredCourses.length} of {coursesData.length} courses
          {selectedCategory !== "All" && ` in "${selectedCategory}"`}
        </Text>
      </View>

      {/* Courses List Section */}
      <View className="p-4">
        <FlatList
          data={filteredCourses} // Use filteredCourses instead of coursesData
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-10">
              <Text className="text-gray-500 text-lg">No courses found</Text>
              <Text className="text-gray-400 mt-2">
                Try selecting a different category
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
