import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("firstTime", "no");
  };

  const goToRegister = async () => {
    await finishOnboarding();
    router.replace("/(auth)/register");
  };

  const goToLogin = async () => {
    await finishOnboarding();
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient colors={["#6A85FF", "#94B5FF"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MoodTM</Text>
        <Text style={styles.subtitle}>
          Your personal mood companion that helps you track and understand your emotions
        </Text>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={goToRegister}>
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={goToLogin}>
            <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 24,
    opacity: 0.9,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  primaryButtonText: {
    color: '#6A85FF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});