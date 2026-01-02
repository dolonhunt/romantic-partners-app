import { ScrollView, Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { useState, useRef, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, Message } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginVertical: 4,
  },
  messageRow: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: "row",
  },
  sentRow: {
    justifyContent: "flex-end",
  },
  receivedRow: {
    justifyContent: "flex-start",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default function MessagesScreen() {
  const { messages, addMessage, currentUser, partnerProfile } = useData();
  const colors = useColors();
  const [messageText, setMessageText] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageText.trim().length === 0) return;

    await addMessage({
      senderId: currentUser?.id || "user1",
      content: messageText,
      mentions,
      createdAt: new Date(),
      isEdited: false,
    });

    setMessageText("");
    setMentions([]);
    Keyboard.dismiss();
  };

  const handleMentionToggle = () => {
    const mentionName = partnerProfile?.name || "Partner";
    if (mentions.includes(mentionName)) {
      setMentions(mentions.filter(m => m !== mentionName));
    } else {
      setMentions([...mentions, mentionName]);
      setMessageText(messageText + `@${mentionName} `);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isSent = item.senderId === (currentUser?.id || "user1");
    const senderName = isSent ? currentUser?.name : partnerProfile?.name;

    return (
      <View style={[styles.messageRow, isSent ? styles.sentRow : styles.receivedRow]}>
        <View>
          <View
            style={[
              styles.messageBubble,
              {
                backgroundColor: isSent ? colors.primary : colors.surface,
              },
            ]}
          >
            <Text
              style={{
                color: isSent ? "white" : colors.foreground,
                fontSize: 16,
                lineHeight: 20,
              }}
            >
              {item.content}
            </Text>
            {item.mentions.length > 0 && (
              <Text
                style={{
                  color: isSent ? "rgba(255,255,255,0.7)" : colors.muted,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Mentioned: {item.mentions.join(", ")}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.timestamp,
              {
                color: colors.muted,
                textAlign: isSent ? "right" : "left",
              },
            ]}
          >
            {new Date(item.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {item.isEdited && " (edited)"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">
          {partnerProfile?.name || "Messages"}
        </Text>
      </View>

      {/* Messages List */}
      {messages.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-bold text-foreground mb-2">No messages yet</Text>
          <Text className="text-base text-muted text-center">
            Start a conversation with {partnerProfile?.name || "your partner"}
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12 }}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Input Area */}
      <View style={[styles.inputContainer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.foreground,
              borderColor: colors.border,
              borderWidth: 1,
            },
          ]}
          placeholder="Type a message..."
          placeholderTextColor={colors.muted}
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={500}
        />

        {/* Mention Button */}
        <TouchableOpacity
          onPress={handleMentionToggle}
          style={[
            styles.sendButton,
            {
              backgroundColor: mentions.length > 0 ? colors.primary : colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={{ fontSize: 18 }}>@</Text>
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={messageText.trim().length === 0}
          style={[
            styles.sendButton,
            {
              backgroundColor: messageText.trim().length > 0 ? colors.primary : colors.surface,
            },
          ]}
        >
          <Text style={{ fontSize: 20 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
