import { useRouter } from "expo-router";
import { Star, Timer } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/authContext"; // your AuthContext

export default function CourseCard() {
  const router = useRouter();
  const { fetchCourseData, loadingCourses } = useAuth();

  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCourseData();
      if (result.success) {
        setCourses(result.data);

        const uniqueCategories = [
          "All",
          ...new Set(result.data.map((c) => c.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      }
    };
    fetchData();
  }, []);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const handleCoursePress = (course) => {
    router.push(
      `/CourseDetails?course=${encodeURIComponent(JSON.stringify(course))}`
    );
  };

  const renderCourse = ({ item }) => {
    // Debug log to see what thumbnail looks like
    console.log("Thumbnail for item:", {
      hasThumbnail: !!item.thumbnail,
      thumbnailType: typeof item.thumbnail,
      thumbnailValue: item.thumbnail,
    });

    return (
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-4"
        activeOpacity={0.7}
        onPress={() => handleCoursePress(item)}
      >
        <View className="flex-row">
          {/* Thumbnail */}
          <View className="mr-4">
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail.uri || item.thumbnail }}
                className="w-32 h-32 rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../assets/images/course/course-1.png")}
                className="w-32 h-32 rounded-xl"
                resizeMode="cover"
              />
            )}
          </View>

          {/* Details */}
          <View className="flex-1">
            {item.category && (
              <View className="self-start bg-green-50 px-3 py-1.5 rounded-full mb-2">
                <Text className="text-xs text-green-800 font-medium">
                  {item.category}
                </Text>
              </View>
            )}
            <Text
              className="font-outfit-regular text-base text-grayPro-800 mb-1"
              numberOfLines={2}
            >
              {item.subjectName}
            </Text>
            <Text
              className="text-sm text-grayPro-500 font-outfit-regular mb-3"
              numberOfLines={3}
            >
              {item.description.substring(0, 50)}
            </Text>

            <View className="flex-row justify-between">
             <View>
               <Star size={16} color={"#5C5E5E"}/>
             </View>
              <View><Timer size={16} color={"#5C5E5E"}/></View>
            </View>

            {/* Display subjects if available */}
        
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loadingCourses) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-gray-600">Loading courses...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredCourses}
      renderItem={renderCourse}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      ListHeaderComponent={
        <View className="p-4 bg-white rounded-xl mb-4">
          {/* Horizontal categories ScrollView */}
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`mr-3 px-4 py-2 rounded-full ${
                  selectedCategory === item ? "bg-primary" : "bg-grayPro-100"
                }`}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  className={`font-medium ${
                    selectedCategory === item ? "text-white" : "text-grayPro-500"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text className="text-grayPro-500 text-sm mt-2">
            Showing {filteredCourses.length} of {courses.length} courses
            {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          </Text>
        </View>
      }
      ListEmptyComponent={() => (
        <View className="items-center justify-center py-10">
          <Text className="text-gray-500 text-lg">No courses found</Text>
          <Text className="text-gray-400 mt-2">No data available yet</Text>
        </View>
      )}
    />
  );
}
