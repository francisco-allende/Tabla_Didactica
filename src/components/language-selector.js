import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import {useState} from 'react';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';

const LanguageSelector = ({onSelectLanguage, selectedLanguage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 5,
    }).start();
    setIsOpen(!isOpen);
  };

  const languages = [
    {code: 'es', flag: require('../assets/img/spain-flag.png')},
    {code: 'en', flag: require('../assets/img/usa-flag.png')},
    {code: 'pt', flag: require('../assets/img/brazil-flag.png')},
  ];

  const selectedLang = languages.find(l => l.code === selectedLanguage);

  return (
    <View style={styles.languageContainer}>
      {/* Botones de opciones */}
      {languages
        .filter(lang => lang.code !== selectedLanguage)
        .map((lang, index) => (
          <Animated.View
            key={lang.code}
            style={[
              styles.languageButton,
              {
                position: 'absolute',
                bottom: 0,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -65 * (index + 1)],
                    }),
                  },
                ],
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}>
            <TouchableOpacity
              style={[styles.flagButton]}
              onPress={() => {
                onSelectLanguage(lang.code);
                toggleMenu();
              }}>
              <Image source={lang.flag} style={styles.flagImage} />
            </TouchableOpacity>
          </Animated.View>
        ))}

      {/* Botón principal */}
      <TouchableOpacity
        style={[styles.flagButton, styles.selectedFlag]}
        onPress={toggleMenu}>
        <Image source={selectedLang.flag} style={styles.flagImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    position: 'absolute',
    left: 20,
    bottom: 10,
    zIndex: 1000,
  },
  languageButton: {
    marginBottom: 10,
  },
  flagButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.azul,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedFlag: {
    backgroundColor: AppColors.verde,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  flagImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default LanguageSelector;
