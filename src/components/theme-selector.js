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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginBottom: 30,
  },
  themeIcon: {
    width: width * 0.1,
    height: width * 0.1,
    margin: width * 0.01,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
