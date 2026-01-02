import { ScrollView, Text, View, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useData } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});

export default function HomeScreen() {
  const { currentUser, partnerProfile, milestones, messages } = useData();
  const colors = useColors();

  // Calculate days together
  const daysTogether = currentUser && partnerProfile
    ? Math.floor((Date.now() - new Date("2023-01-01").getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Get next milestone
  const nextMilestone = milestones.length > 0
    ? milestones.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
    : null;

  // Get latest message
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        {/* Header */}
        <View className="bg-primary px-6 pt-8 pb-6 rounded-b-3xl">
          <Text className="text-3xl font-bold text-white mb-2">
            {currentUser ? `Welcome, ${currentUser.name}` : "Welcome"}
          </Text>
          <Text className="text-base text-white opacity-90">
            {partnerProfile ? `You & ${partnerProfile.name}` : "Connect with your partner"}
          </Text>
        </View>

        <View className="flex-1 px-6 pt-6 gap-4">
          {/* Relationship Stats */}
          {currentUser && partnerProfile && (
            <View className="bg-surface rounded-2xl p-5 border border-border">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-foreground">Relationship</Text>
                <Text className="text-sm text-muted">Since Jan 1, 2023</Text>
              </View>
              <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="text-3xl font-bold text-primary">{daysTogether}</Text>
                  <Text className="text-xs text-muted mt-1">Days Together</Text>
                </View>
                <View className="w-px bg-border" />
                <View className="items-center">
                  <Text className="text-3xl font-bold text-primary">{milestones.length}</Text>
                  <Text className="text-xs text-muted mt-1">Milestones</Text>
                </View>
                <View className="w-px bg-border" />
                <View className="items-center">
                  <Text className="text-3xl font-bold text-primary">{messages.length}</Text>
                  <Text className="text-xs text-muted mt-1">Messages</Text>
                </View>
              </View>
            </View>
          )}

          {/* Next Milestone */}
          {nextMilestone && (
            <Link href="/milestones" asChild>
              <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View className="bg-surface rounded-2xl p-5 border border-border">
                <Text className="text-sm font-semibold text-muted mb-2">UPCOMING</Text>
                <Text className="text-xl font-bold text-foreground mb-1">
                  {nextMilestone.title}
                </Text>
                <Text className="text-sm text-muted">
                  {new Date(nextMilestone.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </View>
              </Pressable>
            </Link>
          )}

          {/* Recent Message */}
          {latestMessage && (
            <Link href="/messages" asChild>
              <Pressable
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View className="bg-surface rounded-2xl p-5 border border-border">
                <Text className="text-sm font-semibold text-muted mb-2">LATEST MESSAGE</Text>
                <Text
                  className="text-base text-foreground leading-relaxed"
                  numberOfLines={2}
                >
                  {latestMessage.content}
                </Text>
                <Text className="text-xs text-muted mt-3">
                  {new Date(latestMessage.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              </Pressable>
            </Link>
          )}

          {/* Quick Actions */}
          <Text className="text-lg font-semibold text-foreground mt-2">Quick Actions</Text>
          <View>
            <Link href="/messages" asChild>
              <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.actionButtonText}>💬 Send Message</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/calendar" asChild>
              <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.actionButtonText}>📅 View Calendar</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/todos" asChild>
              <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary, marginBottom: 0 }]}
            >
              <Text style={styles.actionButtonText}>✓ Create Todo</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
