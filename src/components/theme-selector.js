import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const ThemeSelector = ({onSelectTheme}) => {
  const themes = [
    {code: 'colors', icon: require('../assets/img/color-icon.png')},
  ];

  return (
    <View style={styles.container}>
      {themes.map(theme => (
        <TouchableOpacity
          key={theme.code}
          style={styles.themeButton}
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
  themeButton: {
    padding: 5,
  },
  themeIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default ThemeSelector;
