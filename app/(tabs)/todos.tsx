import { Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, Todo } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  todoCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
  priorityButton: {
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

const CATEGORIES = ["Work", "Personal", "Home", "Health", "Finance", "Travel"];
const PRIORITIES = ["low", "medium", "high"] as const;

export default function TodosScreen() {
  const { todos, addTodo, updateTodo, deleteTodo } = useData();
  const colors = useColors();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
    category: string;
    priority: "low" | "medium" | "high";
    dueDate: Date | undefined;
  }>({
    title: "",
    description: "",
    category: CATEGORIES[0],
    priority: "medium",
    dueDate: undefined,
  });

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = async () => {
    if (newTodo.title.trim().length === 0) return;

    await addTodo({
      title: newTodo.title,
      description: newTodo.description,
      category: newTodo.category,
      priority: newTodo.priority,
      dueDate: newTodo.dueDate,
      completed: false,
    });

    setNewTodo({
      title: "",
      description: "",
      category: CATEGORIES[0],
      priority: "medium",
      dueDate: undefined,
    });
    setShowModal(false);
  };

  const handleToggleTodo = async (todo: Todo) => {
    await updateTodo(todo.id, {
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date() : undefined,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return colors.error;
      case "medium":
        return colors.warning;
      case "low":
        return colors.success;
      default:
        return colors.muted;
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      onPress={() => handleToggleTodo(item)}
      style={[
        styles.todoCard,
        {
          backgroundColor: item.completed ? colors.surface : colors.background,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: item.completed ? colors.primary : colors.border,
              backgroundColor: item.completed ? colors.primary : "transparent",
            },
          ]}
        >
          {item.completed && <Text style={{ color: "white", fontSize: 16 }}>✓</Text>}
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.foreground,
                textDecorationLine: item.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {item.title}
            </Text>
            <View
              style={{
                backgroundColor: getPriorityColor(item.priority),
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
                marginLeft: 8,
              }}
            >
              <Text style={{ fontSize: 10, color: "white", fontWeight: "600" }}>
                {item.priority.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: colors.surface,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.muted }}>
                {item.category}
              </Text>
            </View>
            {item.dueDate && (
              <Text style={{ fontSize: 12, color: colors.muted }}>
                Due: {new Date(item.dueDate).toLocaleDateString()}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Todos</Text>
        <Text className="text-base text-white opacity-90 mt-1">
          {filteredTodos.length} {filter === "completed" ? "completed" : filter === "active" ? "active" : "total"}
        </Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 12, paddingHorizontal: 12 }}
        contentContainerStyle={{ gap: 8 }}
      >
        {(["all", "active", "completed"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterButton,
              {
                backgroundColor: filter === f ? colors.primary : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: filter === f ? "white" : colors.foreground,
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Todos List */}
      {filteredTodos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-bold text-foreground mb-2">No todos</Text>
          <Text className="text-base text-muted text-center">
            {filter === "completed"
              ? "You haven't completed any tasks yet"
              : "Create your first todo to get started"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}

      {/* Add Button */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={[styles.addButton, { backgroundColor: colors.primary }]}
        >
          <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
            + Add Todo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Todo Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.foreground, marginBottom: 16 }}>
              Add New Todo
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
              placeholder="Todo title"
              placeholderTextColor={colors.muted}
              value={newTodo.title}
              onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
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
              value={newTodo.description}
              onChangeText={(text) => setNewTodo({ ...newTodo, description: text })}
              multiline
            />

            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
              Category
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}
              contentContainerStyle={{ gap: 8 }}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setNewTodo({ ...newTodo, category: cat })}
                  style={[
                    styles.priorityButton,
                    {
                      backgroundColor: newTodo.category === cat ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: newTodo.category === cat ? "white" : colors.foreground,
                      fontWeight: "600",
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>
              Priority
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setNewTodo({ ...newTodo, priority: p as "low" | "medium" | "high" })}
                  style={[
                    styles.priorityButton,
                    {
                      backgroundColor: newTodo.priority === p ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: newTodo.priority === p ? "white" : colors.foreground,
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={handleAddTodo}
              style={[styles.addButton, { backgroundColor: colors.primary }]}
            >
              <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
                Create Todo
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
