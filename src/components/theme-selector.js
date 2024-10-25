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

const ThemeSelector = ({onSelectTheme, selectedTheme}) => {
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

  const themes = [
    {code: 'colors', icon: require('../assets/img/colors.png')},
    {code: 'animals', icon: require('../assets/img/animals.png')},
    {code: 'numbers', icon: require('../assets/img/numbers.png')},
  ];

  // Encuentra el tema seleccionado para el botón principal
  const selectedThemeObj = themes.find(t => t.code === selectedTheme);

  return (
    <View style={styles.themeContainer}>
      {/* Botones de opciones */}
      {themes
        .filter(theme => theme.code !== selectedTheme)
        .map((theme, index) => (
          <Animated.View
            key={theme.code}
            style={[
              styles.themeButtonContainer,
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
              style={[styles.themeButton]}
              onPress={() => {
                onSelectTheme(theme.code);
                toggleMenu();
              }}>
              <Image source={theme.icon} style={styles.themeIcon} />
            </TouchableOpacity>
          </Animated.View>
        ))}

      {/* Botón principal */}
      <TouchableOpacity
        style={[styles.themeButton, styles.selectedTheme]}
        onPress={toggleMenu}>
        <Image source={selectedThemeObj.icon} style={styles.themeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  themeContainer: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    zIndex: 1000,
  },
  themeButton: {
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
  selectedTheme: {
    backgroundColor: AppColors.verde,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  themeIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default ThemeSelector;
