import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, Profile } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  profileCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 14,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
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
});

export default function ProfileScreen() {
  const { currentUser, partnerProfile, setCurrentUser } = useData();
  const colors = useColors();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<Profile | null>(currentUser);

  const handleSaveProfile = async () => {
    if (editData) {
      await setCurrentUser(editData);
      setShowEditModal(false);
    }
  };

  const renderProfileSection = (profile: Profile | null, title: string, isPartner: boolean) => {
    if (!profile) {
      return (
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 14, color: colors.muted }}>
            {isPartner ? "Partner profile not set up yet" : "Your profile not set up yet"}
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.profileHeader}>
          <View
            style={[
              styles.profileImage,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={{ fontSize: 32 }}>
              {isPartner ? "💑" : "👤"}
            </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.foreground }}>
            {profile.name}
          </Text>
          {!isPartner && (
            <TouchableOpacity
              onPress={() => {
                setEditData(profile);
                setShowEditModal(true);
              }}
              style={{
                marginTop: 12,
                paddingHorizontal: 16,
                paddingVertical: 6,
                backgroundColor: colors.primary,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {profile.bio && (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: colors.muted, fontWeight: "600", marginBottom: 4 }}>
              BIO
            </Text>
            <Text style={{ fontSize: 14, color: colors.foreground, lineHeight: 20 }}>
              {profile.bio}
            </Text>
          </View>
        )}

        {profile.interests.length > 0 && (
          <View>
            <Text style={{ fontSize: 12, color: colors.muted, fontWeight: "600", marginBottom: 8 }}>
              INTERESTS
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {profile.interests.map((interest, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "white", fontWeight: "600" }}>
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Profile</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 12, paddingBottom: 20 }}>
        {/* Your Profile */}
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginHorizontal: 16, marginTop: 12, marginBottom: 8 }}>
          Your Profile
        </Text>
        {renderProfileSection(currentUser, "Your Profile", false)}

        {/* Partner Profile */}
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginHorizontal: 16, marginTop: 20, marginBottom: 8 }}>
          Partner Profile
        </Text>
        {renderProfileSection(partnerProfile, "Partner Profile", true)}

        {/* Settings */}
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginHorizontal: 16, marginTop: 20, marginBottom: 8 }}>
          Settings
        </Text>
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              Notifications
            </Text>
            <Text style={[styles.settingValue, { color: colors.muted }]}>
              Enabled
            </Text>
          </View>
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              Theme
            </Text>
            <Text style={[styles.settingValue, { color: colors.muted }]}>
              Auto
            </Text>
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              App Version
            </Text>
            <Text style={[styles.settingValue, { color: colors.muted }]}>
              1.0.0
            </Text>
          </View>
        </View>

        {/* About */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border, marginTop: 12 }]}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
            About Couple
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, lineHeight: 20 }}>
            Couple is a modern app designed to help romantic partners connect, communicate, and celebrate their relationship together.
          </Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.foreground, marginBottom: 16 }}>
              Edit Profile
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
              placeholder="Your name"
              placeholderTextColor={colors.muted}
              value={editData?.name || ""}
              onChangeText={(text) =>
                setEditData(editData ? { ...editData, name: text } : null)
              }
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
              placeholder="Bio"
              placeholderTextColor={colors.muted}
              value={editData?.bio || ""}
              onChangeText={(text) =>
                setEditData(editData ? { ...editData, bio: text } : null)
              }
              multiline
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
              placeholder="Interests (comma-separated)"
              placeholderTextColor={colors.muted}
              value={editData?.interests.join(", ") || ""}
              onChangeText={(text) =>
                setEditData(
                  editData
                    ? {
                        ...editData,
                        interests: text
                          .split(",")
                          .map((i) => i.trim())
                          .filter((i) => i.length > 0),
                      }
                    : null
                )
              }
            />

            <TouchableOpacity
              onPress={handleSaveProfile}
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                Save Changes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowEditModal(false)}
              style={[
                styles.button,
                {
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={{ color: colors.foreground, fontWeight: "600", fontSize: 16 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
