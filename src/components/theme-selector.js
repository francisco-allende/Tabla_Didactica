import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {AppColors} from '../assets/styles/default-styles';

const ThemeSelector = ({onSelectTheme, selectedTheme}) => {
  const themes = [
    {code: 'colors', icon: require('../assets/img/colors.png')},
    {code: 'animals', icon: require('../assets/img/animals.png')},
    {code: 'numbers', icon: require('../assets/img/numbers.png')},
  ];

  return (
    <View style={styles.container}>
      {themes.map(theme => (
        <TouchableOpacity
          key={theme.code}
          style={[
            styles.themeButton,
            selectedTheme === theme.code && styles.selectedTheme,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  themeButton: {
    padding: 5,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 15,
  },
  selectedTheme: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  themeIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default ThemeSelector;
