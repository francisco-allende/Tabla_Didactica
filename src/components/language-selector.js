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

const LanguageSelector = ({onSelectLanguage, selectedLanguage}) => {
  const orientation = useOrientation();
  const languages = [
    {code: 'es', flag: require('../assets/img/spain-flag.png')},
    {code: 'en', flag: require('../assets/img/usa-flag.png')},
    {code: 'pt', flag: require('../assets/img/brazil-flag.png')},
  ];

  return (
    <View
      style={[
        styles.container,
        orientation === 'LANDSCAPE' && styles.landscapeContainer,
      ]}>
      {languages.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.flagButton,
            selectedLanguage === lang.code && styles.selectedFlag,
            orientation === 'LANDSCAPE' && styles.landscapeFlagButton,
          ]}
          onPress={() => onSelectLanguage(lang.code)}>
          <Image source={lang.flag} style={styles.flagImage} />
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
  flagButton: {
    padding: 5,
    borderRadius: 10,
  },
  landscapeFlagButton: {
    marginBottom: 10,
  },
  selectedFlag: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  flagImage: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },
});

export default LanguageSelector;
