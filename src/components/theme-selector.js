import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../functions/orientation';

const ThemeSelector = ({onSelectTheme, selectedTheme}) => {
  const orientation = useOrientation();
  const themes = [
    {code: 'colors', icon: require('../assets/img/colors.png')},
    {code: 'animals', icon: require('../assets/img/animals.png')},
    {code: 'numbers', icon: require('../assets/img/numbers.png')},
  ];

  return (
    <View
      style={[
        styles.container,
        orientation === 'LANDSCAPE' && styles.landscapeContainer,
      ]}>
      {themes.map(theme => (
        <TouchableOpacity
          key={theme.code}
          style={[
            styles.themeButton,
            selectedTheme === theme.code && styles.selectedTheme,
            orientation === 'LANDSCAPE' && styles.landscapeThemeButton,
          ]}
          onPress={() => onSelectTheme(theme.code)}>
          <Image source={theme.icon} style={styles.themeIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  landscapeContainer: {
    flexDirection: 'column',
  },
  themeButton: {
    padding: 5,
    borderRadius: 10,
  },
  landscapeThemeButton: {
    marginBottom: 10,
  },
  selectedTheme: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  themeIcon: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },
});

export default ThemeSelector;
