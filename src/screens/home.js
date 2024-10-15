import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import Sound from 'react-native-sound';
import LanguageSelector from '../components/language-selector';
import ThemeSelector from '../components/theme-selector';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';
import GoBackScreen from '../components/go-back';

Sound.setCategory('Playback');

const {width, height} = Dimensions.get('window');

const audioFiles = {
  // Español (es)
  'es-uno': require('../assets/sounds/numbers/es-uno.mp3'),
  'es-dos': require('../assets/sounds/numbers/es-dos.mp3'),
  'es-tres': require('../assets/sounds/numbers/es-tres.mp3'),
  'es-cuatro': require('../assets/sounds/numbers/es-cuatro.mp3'),
  'es-cinco': require('../assets/sounds/numbers/es-cinco.mp3'),
  'es-seis': require('../assets/sounds/numbers/es-seis.mp3'),
  'es-perro': require('../assets/sounds/animals/es-perro.mp3'),
  'es-conejo': require('../assets/sounds/animals/es-conejo.mp3'),
  'es-leon': require('../assets/sounds/animals/es-leon.mp3'),
  'es-vaca': require('../assets/sounds/animals/es-vaca.mp3'),
  'es-elefante': require('../assets/sounds/animals/es-elefante.mp3'),
  'es-pajaro': require('../assets/sounds/animals/es-pajaro.mp3'),
  'es-amarillo': require('../assets/sounds/colors/es-amarillo.mp3'),
  'es-azul': require('../assets/sounds/colors/es-azul.mp3'),
  'es-rojo': require('../assets/sounds/colors/es-rojo.mp3'),
  'es-verde': require('../assets/sounds/colors/es-verde.mp3'),
  'es-morado': require('../assets/sounds/colors/es-morado.mp3'),
  'es-naranja': require('../assets/sounds/colors/es-naranja.mp3'),

  // Inglés (en)
  'en-uno': require('../assets/sounds/numbers/en-uno.mp3'),
  'en-dos': require('../assets/sounds/numbers/en-dos.mp3'),
  'en-tres': require('../assets/sounds/numbers/en-tres.mp3'),
  'en-cuatro': require('../assets/sounds/numbers/en-cuatro.mp3'),
  'en-cinco': require('../assets/sounds/numbers/en-cinco.mp3'),
  'en-seis': require('../assets/sounds/numbers/en-seis.mp3'),
  'en-perro': require('../assets/sounds/animals/en-perro.mp3'),
  'en-conejo': require('../assets/sounds/animals/en-conejo.mp3'),
  'en-leon': require('../assets/sounds/animals/en-leon.mp3'),
  'en-vaca': require('../assets/sounds/animals/en-vaca.mp3'),
  'en-elefante': require('../assets/sounds/animals/en-elefante.mp3'),
  'en-pajaro': require('../assets/sounds/animals/en-pajaro.mp3'),
  'en-amarillo': require('../assets/sounds/colors/en-amarillo.mp3'),
  'en-azul': require('../assets/sounds/colors/en-azul.mp3'),
  'en-rojo': require('../assets/sounds/colors/en-rojo.mp3'),
  'en-verde': require('../assets/sounds/colors/en-verde.mp3'),
  'en-morado': require('../assets/sounds/colors/en-morado.mp3'),
  'en-naranja': require('../assets/sounds/colors/en-naranja.mp3'),

  // Portugués (pt)
  'pt-uno': require('../assets/sounds/numbers/pt-uno.mp3'),
  'pt-dos': require('../assets/sounds/numbers/pt-dos.mp3'),
  'pt-tres': require('../assets/sounds/numbers/pt-tres.mp3'),
  'pt-cuatro': require('../assets/sounds/numbers/pt-cuatro.mp3'),
  'pt-cinco': require('../assets/sounds/numbers/pt-cinco.mp3'),
  'pt-seis': require('../assets/sounds/numbers/pt-seis.mp3'),
  'pt-perro': require('../assets/sounds/animals/pt-perro.mp3'),
  'pt-conejo': require('../assets/sounds/animals/pt-conejo.mp3'),
  'pt-leon': require('../assets/sounds/animals/pt-leon.mp3'),
  'pt-vaca': require('../assets/sounds/animals/pt-vaca.mp3'),
  'pt-elefante': require('../assets/sounds/animals/pt-elefante.mp3'),
  'pt-pajaro': require('../assets/sounds/animals/pt-pajaro.mp3'),
  'pt-amarillo': require('../assets/sounds/colors/pt-amarillo.mp3'),
  'pt-azul': require('../assets/sounds/colors/pt-azul.mp3'),
  'pt-rojo': require('../assets/sounds/colors/pt-rojo.mp3'),
  'pt-verde': require('../assets/sounds/colors/pt-verde.mp3'),
  'pt-morado': require('../assets/sounds/colors/pt-morado.mp3'),
  'pt-naranja': require('../assets/sounds/colors/pt-naranja.mp3'),
};

const optionImages = {
  // Numbers
  1: require('../assets/img/game/numbers/uno.png'),
  2: require('../assets/img/game/numbers/dos.png'),
  3: require('../assets/img/game/numbers/tres.png'),
  4: require('../assets/img/game/numbers/cuatro.png'),
  5: require('../assets/img/game/numbers/cinco.png'),
  6: require('../assets/img/game/numbers/seis.png'),
  // Colors
  Azul: require('../assets/img/game/colors/azul.png'),
  Verde: require('../assets/img/game/colors/verde.png'),
  Rojo: require('../assets/img/game/colors/rojo.png'),
  Amarillo: require('../assets/img/game/colors/amarillo.png'),
  Morado: require('../assets/img/game/colors/morado.png'),
  Naranja: require('../assets/img/game/colors/naranja.png'),
  // Animals
  Vaca: require('../assets/img/game/animals/vaca.png'),
  Perro: require('../assets/img/game/animals/perro.png'),
  Conejo: require('../assets/img/game/animals/conejo.png'),
  Pajaro: require('../assets/img/game/animals/pajaro.png'),
  Elefante: require('../assets/img/game/animals/elefante.png'),
  Leon: require('../assets/img/game/animals/leon.png'),
};

const numberToWord = {
  1: 'uno',
  2: 'dos',
  3: 'tres',
  4: 'cuatro',
  5: 'cinco',
  6: 'seis',
};

const HomeScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Español por defecto
  const [selectedTheme, setSelectedTheme] = useState('animals'); // Animales por defecto
  const orientation = useOrientation();
  const currentSound = useRef(null);

  const items = {
    animals: ['Vaca', 'Perro', 'Conejo', 'Pajaro', 'Elefante', 'Leon'],
    colors: ['Azul', 'Verde', 'Rojo', 'Amarillo', 'Morado', 'Naranja'],
    numbers: [1, 2, 3, 4, 5, 6],
  };

  const handleLanguageSelect = languageCode => {
    setSelectedLanguage(languageCode);
  };

  const handleThemeSelect = themeCode => {
    setSelectedTheme(themeCode);
  };

  const playSound = item => {
    if (currentSound.current) {
      currentSound.current.stop(() => {
        currentSound.current.release();
      });
    }

    let audioKey;
    if (selectedTheme === 'numbers') {
      audioKey = `${selectedLanguage}-${numberToWord[item]}`;
    } else {
      audioKey = `${selectedLanguage}-${item.toLowerCase()}`;
    }

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <GoBackScreen />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.languageContainer}>
            <LanguageSelector
              onSelectLanguage={handleLanguageSelect}
              selectedLanguage={selectedLanguage}
            />
          </View>
          <View style={styles.themeContainer}>
            <ThemeSelector
              onSelectTheme={handleThemeSelect}
              selectedTheme={selectedTheme}
            />
          </View>
        </View>

        <View style={styles.gameContainer}>
          {items[selectedTheme].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemButton}
              onPress={() => playSound(item)}>
              <Image
                source={optionImages[item]}
                style={styles.itemImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.amarillo,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  languageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  themeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginTop: 20,
  },
  itemButton: {
    width: width * 0.14,
    height: width * 0.14,
    margin: width * 0.01,
    backgroundColor: AppColors.celeste,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: '90%',
    height: '90%',
  },
});

export default HomeScreen;
