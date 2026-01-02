import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function CalendarScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-0 flex-1">
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Calendar</Text>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-foreground mb-2">Shared Calendar</Text>
        <Text className="text-base text-muted text-center">
          View and manage shared events with your partner
        </Text>
      </View>
    </ScreenContainer>
  );
}
