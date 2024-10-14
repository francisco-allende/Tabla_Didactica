import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import getQuestions from '../utils/getQuestions';
import {AppColors} from '../assets/styles/default-styles';

Sound.setCategory('Playback');

const audioFiles = {
  // Español (es)
  'es-colors-sol': require('../assets/sounds/es-colors-sol.mp3'),
  'es-colors-limon': require('../assets/sounds/es-colors-limon.mp3'),
  'es-colors-pasto': require('../assets/sounds/es-colors-pasto.mp3'),
  'es-numbers-perro': require('../assets/sounds/es-numbers-perro.mp3'),
  'es-numbers-mano': require('../assets/sounds/es-numbers-mano.mp3'),
  'es-numbers-triangulo': require('../assets/sounds/es-numbers-triangulo.mp3'),
  'es-animals-queso': require('../assets/sounds/es-animals-queso.mp3'),
  'es-animals-volar': require('../assets/sounds/es-animals-volar.mp3'),
  'es-animals-trompa': require('../assets/sounds/es-animals-trompa.mp3'),

  // Inglés (en)
  'en-colors-sol': require('../assets/sounds/en-colors-sol.mp3'),
  'en-colors-limon': require('../assets/sounds/en-colors-limon.mp3'),
  'en-colors-pasto': require('../assets/sounds/en-colors-pasto.mp3'),
  'en-numbers-perro': require('../assets/sounds/en-numbers-perro.mp3'),
  'en-numbers-mano': require('../assets/sounds/en-numbers-mano.mp3'),
  'en-numbers-triangulo': require('../assets/sounds/en-numbers-triangulo.mp3'),
  'en-animals-queso': require('../assets/sounds/en-animals-queso.mp3'),
  'en-animals-volar': require('../assets/sounds/en-animals-volar.mp3'),
  'en-animals-trompa': require('../assets/sounds/en-animals-trompa.mp3'),

  // Portugués (pt)
  'pt-colors-sol': require('../assets/sounds/pt-colors-sol.mp3'),
  'pt-colors-limon': require('../assets/sounds/pt-colors-limon.mp3'),
  'pt-colors-pasto': require('../assets/sounds/pt-colors-pasto.mp3'),
  'pt-numbers-perro': require('../assets/sounds/pt-numbers-perro.mp3'),
  'pt-numbers-mano': require('../assets/sounds/pt-numbers-mano.mp3'),
  'pt-numbers-triangulo': require('../assets/sounds/pt-numbers-triangulo.mp3'),
  'pt-animals-queso': require('../assets/sounds/pt-animals-queso.mp3'),
  'pt-animals-volar': require('../assets/sounds/pt-animals-volar.mp3'),
  'pt-animals-trompa': require('../assets/sounds/pt-animals-trompa.mp3'),
};

const GameScreen = ({route, navigation}) => {
  const {language, theme} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const currentSound = useRef(null);

  useEffect(() => {
    const loadedQuestions = getQuestions(language, theme);
    setQuestions(loadedQuestions);
    if (loadedQuestions.length > 0) {
      loadAndPlayAudio(loadedQuestions[0]);
    }

    return () => {
      if (currentSound.current) {
        currentSound.current.release();
      }
    };
  }, [language, theme]);

  const loadAndPlayAudio = question => {
    if (currentSound.current) {
      currentSound.current.stop(() => {
        currentSound.current.release();
      });
    }

    const audioKey = `${language}-${theme}-${question.audioFile}`;
    const soundFile = audioFiles[audioKey];

    if (!soundFile) {
      console.log('Audio file not found:', audioKey);
      return;
    }

    const sound = new Sound(soundFile, error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }
      currentSound.current = sound;
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    });
  };

  const handleAnswer = selectedAnswer => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        loadAndPlayAudio(questions[nextIndex]);
        return nextIndex;
      });
    } else {
      navigation.navigate('Result', {score, total: questions.length});
    }
  };

  const replayAudio = () => {
    if (currentSound.current) {
      currentSound.current.stop(() => {
        currentSound.current.play();
      });
    } else {
      loadAndPlayAudio(questions[currentQuestionIndex]);
    }
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.replayButton} onPress={replayAudio}>
        <Text style={styles.replayButtonText}>Replay Audio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: AppColors.amarillo,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: AppColors.azul,
  },
  option: {
    backgroundColor: AppColors.lima,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  replayButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  replayButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GameScreen;
