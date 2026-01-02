import { Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, CalendarEvent } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 2,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "600",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  eventCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
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
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
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

const EVENT_TYPES = ["anniversary", "date", "milestone", "todo", "other"] as const;
const COLORS = ["#E91E63", "#2196F3", "#4CAF50", "#FF9800", "#9C27B0"];

export default function CalendarScreen() {
  const { calendarEvents, addCalendarEvent, deleteCalendarEvent } = useData();
  const colors = useColors();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    eventType: "anniversary" | "date" | "milestone" | "todo" | "other";
    startDate: Date;
    location: string;
    color: string;
  }>({
    title: "",
    description: "",
    eventType: "other",
    startDate: new Date(),
    location: "",
    color: COLORS[0],
  });

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toDateString();
    return calendarEvents.filter(
      (event) => new Date(event.startDate).toDateString() === dateStr
    );
  };

  // Get all events for current month
  const monthEvents = useMemo(() => {
    return calendarEvents.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [calendarEvents, currentDate]);

  const handleAddEvent = async () => {
    if (newEvent.title.trim().length === 0) return;

    await addCalendarEvent({
      title: newEvent.title,
      description: newEvent.description,
      eventType: newEvent.eventType,
      startDate: newEvent.startDate,
      location: newEvent.location,
      color: newEvent.color,
    });

    setNewEvent({
      title: "",
      description: "",
      eventType: "other",
      startDate: new Date(),
      location: "",
      color: COLORS[0],
    });
    setShowModal(false);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "anniversary":
        return colors.error;
      case "date":
        return colors.primary;
      case "milestone":
        return colors.warning;
      case "todo":
        return colors.success;
      default:
        return colors.muted;
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Calendar</Text>
        <Text className="text-base text-white opacity-90 mt-1">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Month Navigation */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 }}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={{ fontSize: 24, color: colors.primary }}>‹</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={{ fontSize: 24, color: colors.primary }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={{ paddingHorizontal: 12 }}>
          {/* Day headers */}
          <View style={{ flexDirection: "row" }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <View key={day} style={{ width: "14.28%", alignItems: "center", paddingVertical: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.muted }}>
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Calendar days */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <View
                key={`empty-${i}`}
                style={[
                  styles.dayCell,
                  { borderColor: colors.border, backgroundColor: colors.surface },
                ]}
              />
            ))}
            {monthDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              return (
                <View
                  key={day}
                  style={[
                    styles.dayCell,
                    { borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.dayText, { color: colors.foreground }]}>
                    {day}
                  </Text>
                  {dayEvents.length > 0 && (
                    <View style={{ flexDirection: "row", gap: 1 }}>
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <View
                          key={idx}
                          style={[styles.eventDot, { backgroundColor: event.color }]}
                        />
                      ))}
                      {dayEvents.length > 2 && (
                        <Text style={{ fontSize: 8, color: colors.muted }}>+</Text>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Events List */}
        {monthEvents.length > 0 && (
          <>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground, marginHorizontal: 16, marginTop: 20, marginBottom: 8 }}>
              Events This Month
            </Text>
            {monthEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                onLongPress={() => deleteCalendarEvent(event.id)}
                style={[
                  styles.eventCard,
                  {
                    backgroundColor: colors.surface,
                    borderLeftColor: event.color,
                  },
                ]}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
                      {event.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    {event.location && (
                      <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                        📍 {event.location}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor: getEventTypeColor(event.eventType),
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "white", fontWeight: "600", textTransform: "capitalize" }}>
                      {event.eventType}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {monthEvents.length === 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginVertical: 40 }}>
            <Text style={{ fontSize: 16, color: colors.muted, textAlign: "center" }}>
              No events this month
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Button */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={[styles.addButton, { backgroundColor: colors.primary }]}
        >
          <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
            + Add Event
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Event Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.foreground, marginBottom: 16 }}>
              Add Event
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
              placeholder="Event title"
              placeholderTextColor={colors.muted}
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
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
              placeholder="Location (optional)"
              placeholderTextColor={colors.muted}
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
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
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
              multiline
            />

            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
              Event Type
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}
              contentContainerStyle={{ gap: 8 }}
            >
              {EVENT_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setNewEvent({ ...newEvent, eventType: type as "anniversary" | "date" | "milestone" | "todo" | "other" })}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor: newEvent.eventType === type ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: newEvent.eventType === type ? "white" : colors.foreground,
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
              Color
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 16, gap: 8 }}>
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setNewEvent({ ...newEvent, color })}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color,
                    borderWidth: newEvent.color === color ? 3 : 0,
                    borderColor: colors.foreground,
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleAddEvent}
              style={[styles.addButton, { backgroundColor: colors.primary }]}
            >
              <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
                Create Event
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
