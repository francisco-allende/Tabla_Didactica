import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const LanguageSelector = ({onSelectLanguage}) => {
  const languages = [
    {code: 'es', flag: require('../assets/img/spain-flag.png')},
  ];

  return (
    <View style={styles.container}>
      {languages.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={styles.flagButton}
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
  flagButton: {
    padding: 5,
  },
  flagImage: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
});

export default LanguageSelector;
