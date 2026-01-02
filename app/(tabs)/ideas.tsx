import { Text, View, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, DateIdea } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  ideaCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
});

const CATEGORIES = ["romantic", "adventure", "casual", "creative"] as const;

const SAMPLE_IDEAS: Omit<DateIdea, "id">[] = [
  {
    title: "Sunset Picnic",
    description: "Pack a basket with wine, cheese, and fruits. Find a scenic spot to watch the sunset together.",
    category: "romantic",
    difficulty: "easy",
    estimatedDuration: 120,
    isSaved: false,
  },
  {
    title: "Cooking Class",
    description: "Take a cooking class together and prepare a three-course meal.",
    category: "creative",
    difficulty: "medium",
    estimatedDuration: 180,
    isSaved: false,
  },
  {
    title: "Mountain Hiking",
    description: "Hike to a scenic viewpoint and enjoy nature together.",
    category: "adventure",
    difficulty: "hard",
    estimatedDuration: 240,
    isSaved: false,
  },
  {
    title: "Movie Night at Home",
    description: "Create a cozy movie night with homemade popcorn and blankets.",
    category: "casual",
    difficulty: "easy",
    estimatedDuration: 150,
    isSaved: false,
  },
  {
    title: "Couples Spa Day",
    description: "Book a couples massage and spa treatment.",
    category: "romantic",
    difficulty: "easy",
    estimatedDuration: 180,
    isSaved: false,
  },
  {
    title: "Kayaking Adventure",
    description: "Rent kayaks and explore a lake or river together.",
    category: "adventure",
    difficulty: "medium",
    estimatedDuration: 180,
    isSaved: false,
  },
];

export default function IdeasScreen() {
  const { savedDateIdeas, saveDateIdea, unsaveDateIdea } = useData();
  const colors = useColors();
  const [filter, setFilter] = useState<"all" | "romantic" | "adventure" | "casual" | "creative">("all");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [ideas, setIdeas] = useState<DateIdea[]>(
    SAMPLE_IDEAS.map((idea, idx) => ({
      ...idea,
      id: `idea-${idx}`,
    }))
  );

  const filteredIdeas = useMemo(() => {
    let filtered = ideas;

    if (filter !== "all") {
      filtered = filtered.filter((idea) => idea.category === filter);
    }

    if (showSavedOnly) {
      filtered = filtered.filter((idea) => idea.isSaved);
    }

    return filtered;
  }, [ideas, filter, showSavedOnly]);

  const handleToggleSave = async (id: string) => {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) return;

    if (idea.isSaved) {
      await unsaveDateIdea(id);
    } else {
      await saveDateIdea(id);
    }

    setIdeas(
      ideas.map((i) =>
        i.id === id ? { ...i, isSaved: !i.isSaved } : i
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return colors.success;
      case "medium":
        return colors.warning;
      case "hard":
        return colors.error;
      default:
        return colors.muted;
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "romantic":
        return "💕";
      case "adventure":
        return "🎒";
      case "casual":
        return "😊";
      case "creative":
        return "🎨";
      default:
        return "✨";
    }
  };

  const renderIdea = ({ item }: { item: DateIdea }) => (
    <TouchableOpacity
      style={[
        styles.ideaCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
            {getCategoryEmoji(item.category)} {item.title}
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 18 }}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleToggleSave(item.id)}
          style={{ marginLeft: 8 }}
        >
          <Text style={{ fontSize: 20 }}>
            {item.isSaved ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(item.difficulty) },
          ]}
        >
          <Text style={{ fontSize: 11, color: "white", fontWeight: "600", textTransform: "capitalize" }}>
            {item.difficulty}
          </Text>
        </View>
        {item.estimatedDuration && (
          <Text style={{ fontSize: 12, color: colors.muted }}>
            ⏱️ {item.estimatedDuration} min
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Date Ideas</Text>
        <Text className="text-base text-white opacity-90 mt-1">
          {filteredIdeas.length} ideas
        </Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 12, paddingHorizontal: 12 }}
        contentContainerStyle={{ gap: 8 }}
      >
        {(["all", "romantic", "adventure", "casual", "creative"] as const).map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setFilter(cat)}
            style={[
              styles.filterButton,
              {
                backgroundColor: filter === cat ? colors.primary : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: filter === cat ? "white" : colors.foreground,
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {cat === "all" ? "All" : cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Saved Filter Toggle */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <TouchableOpacity
          onPress={() => setShowSavedOnly(!showSavedOnly)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: showSavedOnly ? colors.primary : colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 6 }}>❤️</Text>
          <Text
            style={{
              color: showSavedOnly ? "white" : colors.foreground,
              fontWeight: "600",
            }}
          >
            Saved Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ideas List */}
      {filteredIdeas.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-bold text-foreground mb-2">No ideas</Text>
          <Text className="text-base text-muted text-center">
            {showSavedOnly
              ? "Save some date ideas to see them here"
              : "Try a different filter"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredIdeas}
          renderItem={renderIdea}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 20 }}
        />
      )}
    </ScreenContainer>
  );
}
