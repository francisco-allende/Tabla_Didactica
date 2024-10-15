import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';

const {width, height} = Dimensions.get('window');

const ThemeSelector = ({onSelectTheme, selectedTheme}) => {
  const orientation = useOrientation();
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
    justifyContent: 'space-around',
    padding: 10,
    marginRight: 20,
  },
  themeIcon: {
    width: 95,
    height: 70,
    resizeMode: 'contain',
  },
  themeButton: {
    padding: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  selectedTheme: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
});

export default ThemeSelector;
