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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginBottom: 30,
  },
  flagImage: {
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
  flagButton: {
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedFlag: {
    backgroundColor: AppColors.celeste,
    borderWidth: 2,
    borderColor: AppColors.azul,
  },
});

export default LanguageSelector;
