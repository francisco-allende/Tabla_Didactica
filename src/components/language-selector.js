import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {AppColors} from '../assets/styles/default-styles';
import {useOrientation} from '../hooks/useOrientation';

const LanguageSelector = ({onSelectLanguage, selectedLanguage}) => {
  const orientation = useOrientation();
  const languages = [
    {code: 'es', flag: require('../assets/img/spain-flag.png')},
    {code: 'en', flag: require('../assets/img/usa-flag.png')},
    {code: 'pt', flag: require('../assets/img/brazil-flag.png')},
  ];

  return (
    <View style={styles.container}>
      {languages.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.flagButton,
            selectedLanguage === lang.code && styles.selectedFlag,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagButton: {
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedFlag: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
  flagImage: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
});

export default LanguageSelector;
