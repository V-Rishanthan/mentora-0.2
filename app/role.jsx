import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "./components/Button";

export default function RoleSelectionScreen() {

    const router = useRouter()

    const handlelogin = () =>{
        router.push("./login")
    }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Background Pattern */}
      <View className="flex-1">
        <Image
          source={require("../assets/images/bg-pattern.jpg")}
          className="absolute w-full h-full"
          resizeMode="cover"
        />

        {/* Overlay */}
        <View className="absolute top-0 left-0 right-0 bottom-0 " />

        <ScrollView
          className="flex-1"
          //   contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Content */}
          <View className="flex-1 px-6 pt-28 pb-10">
            {/* Header */}
            <View className="items-center ">
              <Text className="text-3xl font-bold text-black mb-2 text-center">
                Choose Your Role
              </Text>
              <Text className="text-base text-gray-200 text-center leading-6">
                Select how you'd like to use Select Mentora
              </Text>
            </View>
          </View>

          {/* Role Cards Container */}
          <View className="flex flex-col gap-5 mb-10 mt-14 px-10 ">

            {/* Student Card */}
            <TouchableOpacity
              className="bg-white rounded-2xl p-5 shadow-2xl flex-row items-center gap-4"
              activeOpacity={0.7}
              onPress={() => console.log("Student selected")}
            >
              {/* Icon */}
              <Image
                source={require("../assets/images/book.png")}
                className="w-16 h-16"
                resizeMode="contain"
              />

              {/* Text Content */}
              <View className="flex-1">
                <Text className="text-xl font-semibold  mb-1">
                  I'm a Student
                </Text>

                <Text className="text-base text-gray leading-6">
                Browse subjects, enroll in courses, and track your learning
                </Text>
              </View>
            </TouchableOpacity>

            {/* Teacher Card */}
            <TouchableOpacity
              className="bg-white rounded-2xl p-5 shadow-2xl flex-row items-center gap-4"
              activeOpacity={0.7}
              onPress={() => console.log("Student selected")}
            >
              {/* Icon */}
              <Image
                source={require("../assets/images/university.png")}
                className="w-16 h-16"
                resizeMode="contain"
              />

              {/* Text Content */}
              <View className="flex-1">
                <Text className="text-xl font-semibold  mb-1">
                 I'm Teacher 
                </Text>

                <Text className="text-base text-gray leading-6">
                 Create classes, manage students, and share your expertises
                </Text>
              </View>
            </TouchableOpacity>


           <View className="mt-14">
             <Button text="Login" onPress={handlelogin}/>

           <View className="flex flex-row justify-center items-center mt-2">
              <Text className="text-base text-black">
              Don't have an account?
            </Text>
            <TouchableOpacity >
              <Text className="text-base text-primary font-semibold underline">
                Sign Up
              </Text>
            </TouchableOpacity>
           </View>
           </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
