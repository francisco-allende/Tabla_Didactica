import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GoBackScreen from '../components/go-back';
import LanguageSelector from '../components/language-selector';
import ThemeSelector from '../components/theme-selector';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';

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
    <SafeAreaView style={styles.safeArea}>
      <GoBackScreen />
      <View
        style={[
          styles.container,
          orientation === 'LANDSCAPE' && styles.landscapeContainer,
          orientation === 'PORTRAIT' && styles.portraitContainer,
        ]}>
        <Text style={styles.title}>¡Vamos a Aprender!</Text>

        <View
          style={[
            styles.contentContainer,
            orientation === 'LANDSCAPE' && styles.landscapeContentContainer,
            orientation === 'PORTRAIT' && styles.portraitContentContainer,
          ]}>
          <View
            style={[
              styles.selectorContainer,
              orientation === 'LANDSCAPE' && styles.landscapeSelectorContainer,
            ]}>
            <Text style={styles.subtitle}>Elige un idioma:</Text>
            <LanguageSelector
              onSelectLanguage={handleLanguageSelect}
              selectedLanguage={selectedLanguage}
            />
          </View>

          <View
            style={[
              styles.selectorContainer,
              orientation === 'LANDSCAPE' && styles.landscapeSelectorContainer,
              orientation === 'PORTRAIT' && styles.portraitSelectorContainer,
            ]}>
            <Text style={styles.subtitle}>Elige un tema:</Text>
            <ThemeSelector
              onSelectTheme={handleThemeSelect}
              selectedTheme={selectedTheme}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.playButton,
            orientation === 'LANDSCAPE' && styles.landscapePlayButton,
            orientation === 'PORTRAIT' && styles.portraitPlayButton,
          ]}
          onPress={startGame}>
          <Image
            source={require('../assets/img/rocket-play.png')}
            style={styles.playButtonImage}
          />
          <Text style={styles.playButtonText}>¡Despegar!</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: AppColors.azul,
    textAlign: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  selectorContainer: {
    backgroundColor: AppColors.blanco,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: AppColors.verde,
    marginBottom: 10,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: AppColors.lima,
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
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

  //portrait
  portraitContainer: {
    flex: 1,
    padding: 20,
  },
  portraitContentContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    flexGrow: 0.6,
  },
  portraitSelectorContainer: {
    backgroundColor: AppColors.blanco,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 0,
    flex: 1,
  },
  portraitPlayButton: {
    backgroundColor: AppColors.lima,
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  //landscape
  landscapeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  landscapeContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 0,
    flexGrow: 1,
  },
  landscapeSelectorContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  landscapePlayButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default HomeScreen;
