import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {AuthContext} from '../utils/auth.context';
import {useNavigation, useRoute} from '@react-navigation/native';
import GoBackScreen from '../components/go-back';
import LanguageSelector from '../components/language-selector';
import ThemeSelector from '../components/theme-selector';
import {AppColors} from '../assets/styles/default-styles';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {userPassword} = route.params;

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleLanguageSelect = languageCode => {
    setSelectedLanguage(languageCode);
    // Aquí puedes agregar lógica adicional para cambiar el idioma de la aplicación
  };

  const handleThemeSelect = themeCode => {
    setSelectedTheme(themeCode);
    // Aquí puedes agregar lógica adicional para cambiar el tema de la aplicación
  };

  return (
    <View style={styles.container}>
      <GoBackScreen />
      <Text style={styles.title}>Tabla Didáctica de Idiomas</Text>

      <Text style={styles.subtitle}>Selecciona un idioma:</Text>
      <LanguageSelector onSelectLanguage={handleLanguageSelect} />

      <Text style={styles.subtitle}>Selecciona un tema:</Text>
      <ThemeSelector onSelectTheme={handleThemeSelect} />

      {selectedLanguage && selectedTheme && (
        <Text style={styles.selectionText}>
          Has seleccionado: {selectedLanguage} - {selectedTheme}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.purple,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: AppColors.white,
    marginTop: 20,
    marginBottom: 10,
  },
  selectionText: {
    fontSize: 16,
    color: AppColors.white,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
