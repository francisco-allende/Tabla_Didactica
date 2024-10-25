// LogoutButton.js
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {AppColors} from '../assets/styles/default-styles';
import {useAuthContext} from '../utils/auth.context';
import {useNavigation} from '@react-navigation/native';
import {useOrientation} from '../hooks/useOrientation';

const LogoutButton = () => {
  const {signOut} = useAuthContext();
  const navigation = useNavigation();
  const orientation = useOrientation();

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.logoutButtonLandscape}
          onPress={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    left: '10%',
    marginLeft: -28,
    bottom: 720,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.tomate,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  logoutButtonLandscape: {
    position: 'absolute',
    left: '5%',
    marginLeft: -28,
    bottom: 300,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.tomate,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
});

export default LogoutButton;
