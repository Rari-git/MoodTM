import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => { // <-- Funcția devine async
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      // Apelăm funcția reală de login!
      await login(email, password);
      // 'onAuthStateChanged' ne va redirecționa automat.
    } catch (error: any) {
      // Gestionăm erorile de la Firebase
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Invalid email or password.');
      } else {
        Alert.alert('Error', 'An error occurred during login.');
        console.error(error);
      }
    }
  };

  return (
    <LinearGradient
      // Folosim un gradient similar cu cel din restul aplicației
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.kav}
      >
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to your account to continue</Text>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={22} color="rgba(255, 255, 255, 0.7)" style={styles.icon} />
          <TextInput 
            placeholder="Email" 
            style={styles.input}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Input Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="rgba(255, 255, 255, 0.7)" style={styles.icon} />
          <TextInput 
            placeholder="Password" 
            style={styles.input} 
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Butonul de Login personalizat */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Link către Register */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// Stiluri noi, mai atractive
// Stiluri noi, mai atractive
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // AM SCOS 'justifyContent: 'center'' DE AICI
    padding: 20, 
  },
  kav: {
    flex: 1, // <-- AM ADĂUGAT ACEASTĂ LINIE
    justifyContent: 'center', // <-- AM ADĂUGAT ACEASTĂ LINIE
    width: '100%',
    alignItems: 'center',
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: { 
    flex: 1,
    height: 50,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  link: { 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 16,
  }
});