import { Text, View } from "react-native";

export default function UserScreen() {
  return (
    <View className="flex-1 bg-primary">
      {/* Top Section */}
      <View className="flex-1 flex-row  px-6 ">
        <Text>user</Text>
      </View>

      {/* White Card */}
      <View className=" h-2/3 bg-white mt-10 rounded-t-[40px] px-8 pt-10"></View>
    </View>
  );
}
