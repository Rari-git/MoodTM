// app/(auth)/register.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const { register } = useAuth(); // <-- Am schimbat din 'login' în 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => { // <-- Funcția devine async
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', "Passwords don't match");
      return;
    }
    
    try {
      // Apelăm funcția reală de register!
      await register(email, password);
      // 'onAuthStateChanged' ne va redirecționa automat.
    } catch (error: any) {
      // Gestionăm erorile de la Firebase
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already in use.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Error', 'An error occurred during registration.');
        console.error(error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.kav}
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

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

        {/* Input Confirm Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="rgba(255, 255, 255, 0.7)" style={styles.icon} />
          <TextInput 
            placeholder="Confirm Password" 
            style={styles.input} 
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry 
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Butonul de Register personalizat */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Link către Login */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// Folosim aceleași stiluri ca la Login pentru consistență
// Folosim aceleași stiluri ca la Login pentru consistență
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