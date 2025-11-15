import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const finish = async () => {
    await AsyncStorage.setItem("firstTime", "no");
    router.replace("/(auth)/register");
  };

  return (
    <LinearGradient colors={["#6A85FF", "#94B5FF"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MoodTM</Text>
        <Text style={styles.subtitle}>
          Your personal mood companion that helps you track and understand your emotions
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={finish}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
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
    marginBottom: 40,
    lineHeight: 24,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#6A85FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});