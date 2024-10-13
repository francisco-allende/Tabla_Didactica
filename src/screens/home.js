import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GoBackGameScreen from '../components/go-back-game';
import LanguageSelector from '../components/language-selector';
import ThemeSelector from '../components/theme-selector';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../functions/orientation';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const orientation = useOrientation();

  const handleLanguageSelect = languageCode => {
    setSelectedLanguage(languageCode);
    if (selectedTheme) {
      navigation.navigate('Game', {
        language: languageCode,
        theme: selectedTheme,
      });
    }
  };

  const handleThemeSelect = themeCode => {
    setSelectedTheme(themeCode);
    if (selectedLanguage) {
      navigation.navigate('Game', {
        language: selectedLanguage,
        theme: themeCode,
      });
    }
  };

  const startGame = () => {
    const language =
      selectedLanguage || ['es', 'en', 'pt'][Math.floor(Math.random() * 3)];
    const theme =
      selectedTheme ||
      ['colors', 'numbers', 'animals'][Math.floor(Math.random() * 3)];
    navigation.navigate('Game', {language, theme});
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        orientation === 'LANDSCAPE' && styles.landscapeContainer,
      ]}>
      <GoBackGameScreen />
      <Text style={styles.title}>¡Vamos a Aprender!</Text>

      <View
        style={[
          styles.contentContainer,
          orientation === 'LANDSCAPE' && styles.landscapeContentContainer,
        ]}>
        <View style={styles.selectorContainer}>
          <Text style={styles.subtitle}>Elige un idioma:</Text>
          <LanguageSelector
            onSelectLanguage={handleLanguageSelect}
            selectedLanguage={selectedLanguage}
          />
        </View>

        <View style={styles.selectorContainer}>
          <Text style={styles.subtitle}>Elige un tema:</Text>
          <ThemeSelector
            onSelectTheme={handleThemeSelect}
            selectedTheme={selectedTheme}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.playButton} onPress={startGame}>
        <Image
          source={require('../assets/img/rocket-play.png')}
          style={styles.playButtonImage}
        />
        <Text style={styles.playButtonText}>¡Despegar!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: AppColors.amarillo,
    padding: 20,
  },
  landscapeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  landscapeContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: AppColors.azul,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: AppColors.verde,
    marginTop: 20,
    marginBottom: 10,
  },
  selectorContainer: {
    backgroundColor: AppColors.blanco,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: AppColors.lima,
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  playButtonImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  playButtonText: {
    color: AppColors.blanco,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
