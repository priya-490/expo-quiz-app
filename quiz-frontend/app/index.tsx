import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client/react";

const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      question
      options
      correctAnswer
    }
  }
`;

export default function QuizScreen() {
  const { loading, error, data } = useQuery<{
    questions: Array<{ id: string; question: string; options: string[]; correctAnswer: string }>
  }>(GET_QUESTIONS);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [userName, setUserName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);


  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.center}>Error: {error.message}</Text>;

  const questions = data?.questions || [];

  // const handleAnswer = (selected: string) => {
  //   if (selected === questions[currentIdx].correctAnswer) {
  //     setScore(score + 1);
  //   }

  //   if (currentIdx + 1 < questions.length) {
  //     setCurrentIdx(currentIdx + 1);
  //   } else {
  //     setQuizEnded(true);
  //   }
  // };
  const handleAnswer = (selected: string) => {
    if (showAnswer) return;   // prevent multiple clicks

    setSelectedOption(selected);
    setShowAnswer(true);

    if (selected === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setQuizEnded(true);
      }
    }, 1000); // 1 second delay
  };


  /* ----------- START SCREEN ----------- */
  if (!quizStarted) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter your name</Text>

          <TextInput
            value={userName}
            onChangeText={setUserName}
            placeholder="Your name"
            style={styles.input}
          />

          <TouchableOpacity
            style={[styles.button, { opacity: userName ? 1 : 0.5 }]}
            disabled={!userName}
            onPress={() => setQuizStarted(true)}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* ----------- RESULT SCREEN ----------- */
  if (quizEnded) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>Well done, {userName} 🎉</Text>
          <Text style={styles.score}>
            Your Score: {score} / {questions.length}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCurrentIdx(0);
              setScore(0);
              setQuizEnded(false);
              setQuizStarted(false);
              setUserName("");
            }}
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* ----------- QUIZ SCREEN ----------- */
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.progress}>
          Question {currentIdx + 1} of {questions.length}
        </Text>

        <View style={styles.card}>
          <Text style={styles.questionText}>
            {questions[currentIdx].question}
          </Text>

          {questions[currentIdx].options.map((opt, i) => {
            const correct = questions[currentIdx].correctAnswer;

            let backgroundColor = '#007AFF';

            if (showAnswer) {
              if (opt === correct) backgroundColor = '#28a745';      // green
              else if (opt === selectedOption) backgroundColor = '#dc3545'; // red
            }

            return (
              <TouchableOpacity
                key={i}
                style={[styles.option, { backgroundColor }]}
                onPress={() => handleAnswer(opt)}
                disabled={showAnswer}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },

  center: { flex: 1, justifyContent: 'center' },

  progress: {
    marginBottom: 10,
    color: '#666',
    textAlign: 'center'
  },

  card: { marginTop: 10 },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },

  option: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8
  },

  optionText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500'
  },

  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },

  score: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600'
  }
});
