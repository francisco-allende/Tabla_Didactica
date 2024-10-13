import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import useAuthenticationApi from '../api/authentication';
import showToast from '../functions/showToast';
import {AppColors} from '../assets/styles/default-styles';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wobble] = useState(new Animated.Value(0));

  const {registerUser} = useAuthenticationApi(
    email,
    password,
    setIsLoading,
    navigation,
  );

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      showToast('error', 'Por favor, completa todos los campos.', 3000);
      wobbleAnimation();
      return;
    }
    if (password !== confirmPassword) {
      showToast('error', 'Las contraseñas no coinciden.', 3000);
      wobbleAnimation();
      return;
    }
    await registerUser();
  };

  const wobbleAnimation = () => {
    Animated.sequence([
      Animated.timing(wobble, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobble, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobble, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/img/bebe.png')} style={styles.logo} />
        <Text style={styles.title}>¡Crea tu cuenta mágica!</Text>
        <Animated.View style={{transform: [{translateX: wobble}]}}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#8E8E8E"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña secreta"
            placeholderTextColor="#8E8E8E"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirma tu contraseña secreta"
            placeholderTextColor="#8E8E8E"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </Animated.View>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading
              ? '¡Preparando tu aventura...!'
              : '¡Crear mi cuenta mágica!'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>¡Ya tengo una cuenta!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.amarillo,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '', // Rosa
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 3,
    borderColor: AppColors.naranja, // Naranja
    color: 'black',
  },
  button: {
    backgroundColor: AppColors.lima, // Lima
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  loginButton: {
    backgroundColor: AppColors.rosa, // Rosa
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
