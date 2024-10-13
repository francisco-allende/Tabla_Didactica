import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {AppColors} from '../assets/styles/default-styles';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 3 segundos de duración

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/icono.png')} style={styles.icon} />
      <Text style={styles.title}>Tabla Didáactica</Text>
      <Text style={styles.info}>Francisco Allende</Text>
      <Text style={styles.info}>División A141-2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.celeste,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
});

export default SplashScreen;
