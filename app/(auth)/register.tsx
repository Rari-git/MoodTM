import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleRegister = async () => {
    const stored = await AsyncStorage.getItem("users");
    const users = stored ? JSON.parse(stored) : [];

    if (users.some((u: any) => u.email === email)) {
      alert("Email deja folosit");
      return;
    }

    users.push({ email, password });

    await AsyncStorage.setItem("users", JSON.stringify(users));
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, marginBottom: 20, textAlign: "center" }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPass}
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{ backgroundColor: "black", padding: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
