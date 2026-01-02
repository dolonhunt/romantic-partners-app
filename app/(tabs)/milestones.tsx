import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function MilestonesScreen() {
  return (
    <ScreenContainer className="p-0 flex-1">
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Milestones</Text>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-foreground mb-2">Relationship Milestones</Text>
        <Text className="text-base text-muted text-center">
          Track and celebrate your special moments together
        </Text>
      </View>
    </ScreenContainer>
  );
}
