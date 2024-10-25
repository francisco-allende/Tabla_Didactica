import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  Platform,
  Animated,
} from 'react-native';
import Sound from 'react-native-sound';
import LanguageSelector from '../components/language-selector';
import ThemeSelector from '../components/theme-selector';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';
import LogoutButton from '../components/log-out';

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
  const currentSound = useRef(null);

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [languageAnimation] = useState(new Animated.Value(0));
  const [themeAnimation] = useState(new Animated.Value(0));

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

  const orientation = useOrientation();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const itemSize =
    orientation === 'PORTRAIT'
      ? dimensions.width * 0.4
      : dimensions.width * 0.135;

  const toggleLanguageMenu = () => {
    const toValue = isLanguageMenuOpen ? 0 : 1;
    Animated.spring(languageAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const toggleThemeMenu = () => {
    const toValue = isThemeMenuOpen ? 0 : 1;
    Animated.spring(themeAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {orientation === 'PORTRAIT' ? (
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
        ) : (
          <View style={styles.gameContainerLandscape}>
            {items[selectedTheme].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.itemButton, styles.itemButtonLandscape]}
                onPress={() => playSound(item)}>
                <Image
                  source={optionImages[item]}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <LanguageSelector
          onSelectLanguage={handleLanguageSelect}
          selectedLanguage={selectedLanguage}
        />
        <ThemeSelector
          onSelectTheme={handleThemeSelect}
          selectedTheme={selectedTheme}
        />
        <LogoutButton />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  languageContainer: {
    flex: 2,
    alignItems: 'center',
  },
  themeContainer: {
    flex: 1,
    alignItems: 'center',
  },

  languageFabContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    zIndex: 1000,
  },
  themeFabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 1000,
  },
  fabItem: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.verde,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedFabButton: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  fabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoutFabButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.tomate,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },

  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'stretch', // Cambiado para estirar el contenido
    padding: 10,
    paddingTop: 20,
  },
  itemButton: {
    width: '48%', // Aumentado para ocupar más espacio horizontal
    height: '32%', // Aproximadamente un tercio de la altura para 6 items
    backgroundColor: AppColors.celeste,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%', // Margen pequeño para separación
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },

  gameContainerLandscape: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: 10,
    paddingTop: 20,
  },
  itemButtonLandscape: {
    width: '32%', // 3 items por fila en landscape
    height: '48%', // 2 filas para los 6 items
    margin: '0.5%', // Margen más pequeño en landscape
  },
});

export default HomeScreen;
