
import { Text, View } from 'react-native'

export default function SectionTitle({hero,sub}) {
  return (
    <View className="px-8">
        <Text className="text-4xl font-bold mb-4">{hero}</Text>
        <Text className="text-gray text-lg mb-3">
         {sub}
        </Text>
      </View>
  )
}