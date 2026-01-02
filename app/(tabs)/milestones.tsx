import { Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, Milestone } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  timelineItem: {
    flexDirection: "row",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  timelineMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  timelineConnector: {
    position: "absolute",
    left: 31,
    top: 24,
    width: 2,
    height: 60,
  },
  milestoneCard: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    maxHeight: "90%",
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
});

export default function MilestonesScreen() {
  const { milestones, addMilestone, deleteMilestone } = useData();
  const colors = useColors();
  const [showModal, setShowModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    date: new Date(),
  });

  // Sort milestones by date
  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleAddMilestone = async () => {
    if (newMilestone.title.trim().length === 0) return;

    await addMilestone({
      title: newMilestone.title,
      description: newMilestone.description,
      date: newMilestone.date,
    });

    setNewMilestone({
      title: "",
      description: "",
      date: new Date(),
    });
    setShowModal(false);
  };

  const getDaysFromNow = (date: Date) => {
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const formatDateDifference = (date: Date) => {
    const days = getDaysFromNow(date);
    if (days < 0) {
      return `${Math.abs(days)} days ago`;
    } else if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Tomorrow";
    } else {
      return `In ${days} days`;
    }
  };

  const renderMilestone = ({ item, index }: { item: Milestone; index: number }) => {
    const isUpcoming = getDaysFromNow(item.date) >= 0;

    return (
      <View style={styles.timelineItem}>
        {index < sortedMilestones.length - 1 && (
          <View
            style={[
              styles.timelineConnector,
              { backgroundColor: colors.border },
            ]}
          />
        )}
        <View
          style={[
            styles.timelineMarker,
            {
              backgroundColor: isUpcoming ? colors.primary : colors.muted,
            },
          ]}
        >
          <Text style={{ fontSize: 12, color: "white", fontWeight: "bold" }}>
            {isUpcoming ? "📍" : "✓"}
          </Text>
        </View>
        <TouchableOpacity
          onLongPress={() => deleteMilestone(item.id)}
          style={[
            styles.milestoneCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
          <Text style={{ fontSize: 12, color: colors.primary, fontWeight: "600", marginTop: 4 }}>
            {formatDateDifference(item.date)}
          </Text>
          {item.description && (
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 6, lineHeight: 16 }}>
              {item.description}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Milestones</Text>
        <Text className="text-base text-white opacity-90 mt-1">
          {sortedMilestones.length} milestones
        </Text>
      </View>

      {/* Timeline */}
      {sortedMilestones.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-bold text-foreground mb-2">No milestones yet</Text>
          <Text className="text-base text-muted text-center">
            Create your first milestone to celebrate special moments
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedMilestones}
          renderItem={renderMilestone}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 20 }}
        />
      )}

      {/* Add Button */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={[styles.addButton, { backgroundColor: colors.primary }]}
        >
          <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
            + Add Milestone
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Milestone Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.foreground, marginBottom: 16 }}>
              Add Milestone
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Milestone title"
              placeholderTextColor={colors.muted}
              value={newMilestone.title}
              onChangeText={(text) => setNewMilestone({ ...newMilestone, title: text })}
            />

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.foreground,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Description (optional)"
              placeholderTextColor={colors.muted}
              value={newMilestone.description}
              onChangeText={(text) => setNewMilestone({ ...newMilestone, description: text })}
              multiline
            />

            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
              Date
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={{ color: colors.foreground, fontSize: 16 }}>
                {newMilestone.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddMilestone}
              style={[styles.addButton, { backgroundColor: colors.primary }]}
            >
              <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
                Create Milestone
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[styles.addButton, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}
            >
              <Text style={{ color: colors.foreground, fontWeight: "600", textAlign: "center", fontSize: 16 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
