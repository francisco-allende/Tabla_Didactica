import React from 'react';
import {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../assets/styles/default-styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar, faHome, faRedoAlt} from '@fortawesome/free-solid-svg-icons';

const ResultScreen = ({route}) => {
  const {score, total, language, theme} = route.params;
  const navigation = useNavigation();

  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return '¡Excelente!';
    if (percentage >= 80) return '¡Muy bien!';
    if (percentage >= 60) return '¡Bien hecho!';
    return '¡Sigue practicando!';
  };

  const restartGame = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getMessage()}</Text>
      <View style={styles.scoreContainer}>
        <FontAwesomeIcon icon={faStar} size={50} color={AppColors.amarillo} />
        <Text style={styles.score}>
          {score} / {total}
        </Text>
      </View>
      <Text style={styles.percentage}>{percentage}%</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={restartGame}>
          <FontAwesomeIcon
            icon={faRedoAlt}
            size={24}
            color={AppColors.blanco}
          />
          <Text style={styles.buttonText}>Jugar de nuevo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.celeste,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: AppColors.blanco,
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: AppColors.blanco,
    marginLeft: 10,
  },
  percentage: {
    fontSize: 24,
    color: AppColors.blanco,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: AppColors.lima,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: AppColors.blanco,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ResultScreen;
