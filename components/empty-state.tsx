import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function EmptyState({ icon = "💭", title, description, action }: EmptyStateProps) {
  const colors = useColors();

  return (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <Text style={{ fontSize: 48, marginBottom: 16 }}>
        {icon}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: colors.foreground,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: colors.muted,
          textAlign: "center",
          lineHeight: 20,
          marginBottom: action ? 16 : 0,
        }}
      >
        {description}
      </Text>
      {action && (
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 14,
            }}
            onPress={action.onPress}
          >
            {action.label}
          </Text>
        </View>
      )}
    </View>
  );
}
