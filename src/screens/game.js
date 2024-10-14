import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Sound from 'react-native-sound';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRotateRight} from '@fortawesome/free-solid-svg-icons';
import getQuestions from '../utils/getQuestions';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';
import GoBackScreen from '../components/go-back';

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

const optionImages = {
  // Numbers
  2: require('../assets/img/game/dos.png'),
  3: require('../assets/img/game/tres.png'),
  4: require('../assets/img/game/cuatro.png'),
  5: require('../assets/img/game/cinco.png'),
  6: require('../assets/img/game/seis.png'),
  // Colors
  Azul: require('../assets/img/game/azul.png'),
  Verde: require('../assets/img/game/verde.png'),
  Rojo: require('../assets/img/game/rojo.png'),
  Amarillo: require('../assets/img/game/amarillo.png'),
  Morado: require('../assets/img/game/morado.png'),
  Naranja: require('../assets/img/game/naranja.png'),
  Marrón: require('../assets/img/game/marron.png'),
  // Animals
  Vaca: require('../assets/img/game/vaca.png'),
  Perro: require('../assets/img/game/perro.png'),
  Conejo: require('../assets/img/game/conejo.png'),
  Pájaro: require('../assets/img/game/pajaro.png'),
  Elefante: require('../assets/img/game/elefante.png'),
  León: require('../assets/img/game/leon.png'),
  Jirafa: require('../assets/img/game/jirafa.png'),
  // English translations
  Blue: require('../assets/img/game/azul.png'),
  Green: require('../assets/img/game/verde.png'),
  Red: require('../assets/img/game/rojo.png'),
  Yellow: require('../assets/img/game/amarillo.png'),
  Purple: require('../assets/img/game/morado.png'),
  Orange: require('../assets/img/game/naranja.png'),
  Brown: require('../assets/img/game/marron.png'),
  Cow: require('../assets/img/game/vaca.png'),
  Dog: require('../assets/img/game/perro.png'),
  Rabbit: require('../assets/img/game/conejo.png'),
  Bird: require('../assets/img/game/pajaro.png'),
  Elephant: require('../assets/img/game/elefante.png'),
  Lion: require('../assets/img/game/leon.png'),
  Giraffe: require('../assets/img/game/jirafa.png'),
  // Portuguese translations
  Azul: require('../assets/img/game/azul.png'),
  Verde: require('../assets/img/game/verde.png'),
  Vermelho: require('../assets/img/game/rojo.png'),
  Amarelo: require('../assets/img/game/amarillo.png'),
  Roxo: require('../assets/img/game/morado.png'),
  Laranja: require('../assets/img/game/naranja.png'),
  Marrom: require('../assets/img/game/marron.png'),
  Vaca: require('../assets/img/game/vaca.png'),
  Cachorro: require('../assets/img/game/perro.png'),
  Coelho: require('../assets/img/game/conejo.png'),
  Pássaro: require('../assets/img/game/pajaro.png'),
  Elefante: require('../assets/img/game/elefante.png'),
  Leão: require('../assets/img/game/leon.png'),
  Girafa: require('../assets/img/game/jirafa.png'),
};

const GameScreen = ({route, navigation}) => {
  const {language, theme} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const currentSound = useRef(null);
  const orientation = useOrientation();

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
    <>
      <GoBackScreen />
      <View style={styles.container}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View
          style={[
            styles.optionsContainer,
            orientation === 'LANDSCAPE' && styles.optionsContainerLandscape,
          ]}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                orientation === 'LANDSCAPE' && styles.optionLandscape,
              ]}
              onPress={() => handleAnswer(option)}>
              <Image
                source={optionImages[option]}
                style={styles.optionImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.replayButton} onPress={replayAudio}>
          <FontAwesomeIcon
            icon={faRotateRight}
            size={24}
            color={AppColors.blanco}
          />
        </TouchableOpacity>
      </View>
    </>
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
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: AppColors.azul,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  optionsContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  option: {
    margin: 10,
    width: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.blanco,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionLandscape: {
    width: '30%',
  },
  optionImage: {
    width: '80%',
    height: '80%',
  },
  replayButton: {
    marginTop: 20,
    backgroundColor: AppColors.verde,
    padding: 15,
    borderRadius: 25,
  },
});

export default GameScreen;
