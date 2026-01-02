import { Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useData, Quiz } from "@/lib/data-context";
import { useColors } from "@/hooks/use-colors";

const styles = StyleSheet.create({
  quizCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  questionContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  optionButton: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  resultContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    maxHeight: "90%",
    width: "90%",
  },
});

const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: "quiz-1",
    title: "Love Language Quiz",
    description: "Discover your primary love language",
    category: "Love Language",
    questions: [
      {
        id: 1,
        question: "What makes you feel most loved?",
        options: ["Words of affirmation", "Quality time", "Gifts", "Acts of service"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "How do you prefer to show love?",
        options: ["Compliments", "Spending time together", "Thoughtful gifts", "Helping with tasks"],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "What hurts you most?",
        options: ["Being criticized", "Being ignored", "Feeling forgotten", "Lack of help"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "quiz-2",
    title: "Compatibility Quiz",
    description: "Test your relationship compatibility",
    category: "Compatibility",
    questions: [
      {
        id: 1,
        question: "Do you share similar life goals?",
        options: ["Completely", "Mostly", "Somewhat", "Not really"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "How do you handle conflicts?",
        options: ["Talk it out", "Take time apart", "Compromise", "Avoid discussing"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "quiz-3",
    title: "Fun Facts Quiz",
    description: "Learn surprising things about each other",
    category: "Fun Facts",
    questions: [
      {
        id: 1,
        question: "What's your partner's favorite childhood memory?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What's their hidden talent?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
      },
    ],
  },
];

export default function QuizzesScreen() {
  const colors = useColors();
  const [quizzes] = useState<Quiz[]>(SAMPLE_QUIZZES);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleSelectAnswer = (optionIdx: number) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);

    if (selectedQuiz && currentQuestionIdx < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRetakeQuiz = () => {
    if (selectedQuiz) {
      handleStartQuiz(selectedQuiz);
    }
  };

  const handleCloseQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    let correct = 0;
    answers.forEach((answer, idx) => {
      if (selectedQuiz.questions[idx].correctAnswer === answer) {
        correct++;
      }
    });
    return Math.round((correct / selectedQuiz.questions.length) * 100);
  };

  const renderQuizCard = ({ item }: { item: Quiz }) => (
    <TouchableOpacity
      onPress={() => handleStartQuiz(item)}
      style={[
        styles.quizCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
        {item.description}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <Text style={{ fontSize: 12, color: colors.muted }}>
          {item.questions.length} questions
        </Text>
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 12, color: "white", fontWeight: "600" }}>
            Start
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (selectedQuiz && !showResults) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIdx];
    const progress = ((currentQuestionIdx + 1) / selectedQuiz.questions.length) * 100;

    return (
      <ScreenContainer className="p-0 flex-1">
        {/* Header */}
        <View className="bg-primary px-6 py-4">
          <TouchableOpacity onPress={handleCloseQuiz}>
            <Text style={{ color: "white", fontSize: 16 }}>✕</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white mt-2">
            {selectedQuiz.title}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
              Question {currentQuestionIdx + 1} of {selectedQuiz.questions.length}
            </Text>
            <Text style={{ fontSize: 14, color: colors.muted }}>
              {Math.round(progress)}%
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: colors.surface,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: colors.primary,
                width: `${progress}%`,
              }}
            />
          </View>
        </View>

        {/* Question */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}>
          <View style={styles.questionContainer}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground, marginBottom: 20 }}>
              {currentQuestion.question}
            </Text>

            {/* Options */}
            {currentQuestion.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSelectAnswer(idx)}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={{ fontSize: 16, color: colors.foreground }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (selectedQuiz && showResults) {
    const score = calculateScore();

    return (
      <ScreenContainer className="p-0 flex-1">
        {/* Header */}
        <View className="bg-primary px-6 py-4">
          <TouchableOpacity onPress={handleCloseQuiz}>
            <Text style={{ color: "white", fontSize: 16 }}>✕</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white mt-2">
            Results
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <View
            style={[
              styles.resultContainer,
              { backgroundColor: colors.surface },
            ]}
          >
            <Text style={{ fontSize: 48, marginBottom: 12 }}>
              {score >= 80 ? "🎉" : score >= 60 ? "👍" : "💪"}
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: colors.primary, marginBottom: 8 }}>
              {score}%
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground, marginBottom: 4 }}>
              {score >= 80
                ? "Excellent!"
                : score >= 60
                ? "Good job!"
                : "Keep learning!"}
            </Text>
            <Text style={{ fontSize: 14, color: colors.muted, marginTop: 12, textAlign: "center" }}>
              You got {Math.round((score / 100) * selectedQuiz.questions.length)} out of{" "}
              {selectedQuiz.questions.length} questions correct
            </Text>
          </View>

          <View style={{ paddingHorizontal: 16, gap: 12, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={handleRetakeQuiz}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 16 }}>
                Retake Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseQuiz}
              style={{
                backgroundColor: colors.surface,
                paddingVertical: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.foreground, fontWeight: "600", textAlign: "center", fontSize: 16 }}>
                Back to Quizzes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0 flex-1">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <Text className="text-2xl font-bold text-white">Quizzes</Text>
        <Text className="text-base text-white opacity-90 mt-1">
          {quizzes.length} quizzes available
        </Text>
      </View>

      {/* Quizzes List */}
      <FlatList
        data={quizzes}
        renderItem={renderQuizCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </ScreenContainer>
  );
}
