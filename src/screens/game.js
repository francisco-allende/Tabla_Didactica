import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {AppColors} from '../assets/styles/default-styles';
import GoBackGameScreen from '../components/go-back-game';

const GameScreen = () => {
  const route = useRoute();
  const {language, theme} = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);

  const questions = {
    colors: {
      es: [
        {
          question: '¿De qué color es el cielo?',
          options: ['Azul', 'Rojo', 'Verde'],
          answer: 'Azul',
        },
        {
          question: '¿De qué color es el sol?',
          options: ['Amarillo', 'Azul', 'Verde'],
          answer: 'Amarillo',
        },
      ],
      en: [
        {
          question: 'What color is the sky?',
          options: ['Blue', 'Red', 'Green'],
          answer: 'Blue',
        },
        {
          question: 'What color is the sun?',
          options: ['Yellow', 'Blue', 'Green'],
          answer: 'Yellow',
        },
      ],
      pt: [
        {
          question: 'De que cor é o céu?',
          options: ['Azul', 'Vermelho', 'Verde'],
          answer: 'Azul',
        },
        {
          question: 'De que cor é o sol?',
          options: ['Amarelo', 'Azul', 'Verde'],
          answer: 'Amarelo',
        },
      ],
    },
    numbers: {
      es: [
        {
          question: 'Que núumero es 10?',
          options: ['2', '11', '10'],
          answer: 'Azul',
        },
        {
          question: '¿De qué color es el sol?',
          options: ['Amarillo', 'Azul', 'Verde'],
          answer: 'Amarillo',
        },
      ],
      en: [
        {
          question: 'What color is the sky?',
          options: ['Blue', 'Red', 'Green'],
          answer: 'Blue',
        },
        {
          question: 'What color is the sun?',
          options: ['Yellow', 'Blue', 'Green'],
          answer: 'Yellow',
        },
      ],
      pt: [
        {
          question: 'De que cor é o céu?',
          options: ['Azul', 'Vermelho', 'Verde'],
          answer: 'Azul',
        },
        {
          question: 'De que cor é o sol?',
          options: ['Amarelo', 'Azul', 'Verde'],
          answer: 'Amarelo',
        },
      ],
    },
    animals: {
      es: [
        {
          question: 'Que animal hace Muu?',
          options: ['Vaca', 'Perro', 'León'],
          answer: 'Vaca',
        },
        {
          question: 'Que animal vuela?',
          options: ['Perro', 'Pato', 'Tiburón'],
          answer: 'Pato',
        },
      ],
      en: [
        {
          question: 'What color is the sky?',
          options: ['Blue', 'Red', 'Green'],
          answer: 'Blue',
        },
        {
          question: 'What color is the sun?',
          options: ['Yellow', 'Blue', 'Green'],
          answer: 'Yellow',
        },
      ],
      pt: [
        {
          question: 'De que cor é o céu?',
          options: ['Azul', 'Vermelho', 'Verde'],
          answer: 'Azul',
        },
        {
          question: 'De que cor é o sol?',
          options: ['Amarelo', 'Azul', 'Verde'],
          answer: 'Amarelo',
        },
      ],
    },
  };

  useEffect(() => {
    setNewQuestion();
  }, []);

  const setNewQuestion = () => {
    console.log(theme, language);
    const themeQuestions = questions[theme][language];
    const randomIndex = Math.floor(Math.random() * themeQuestions.length);
    setCurrentQuestion(themeQuestions[randomIndex]);
  };

  const handleAnswer = selectedAnswer => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    setNewQuestion();
  };

  if (!currentQuestion) return <Text>Cargando...</Text>;

  return (
    <>
      <GoBackGameScreen />
      <View style={styles.container}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.score}>Puntuación: {score}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.celeste,
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.azul,
    textAlign: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: AppColors.lima,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  optionText: {
    color: AppColors.blanco,
    fontSize: 18,
    textAlign: 'center',
  },
  score: {
    fontSize: 20,
    color: AppColors.azul,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default GameScreen;
