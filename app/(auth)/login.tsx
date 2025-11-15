import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleLogin = async () => {
    const stored = await AsyncStorage.getItem("users");
    const users = stored ? JSON.parse(stored) : [];

    const user = users.find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      alert("Date invalide");
      return;
    }

    await AsyncStorage.setItem("isLoggedIn", "true");
    router.replace("/(tabs)/home");
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, marginBottom: 20, textAlign: "center" }}>
        Login
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
        onPress={handleLogin}
        style={{ backgroundColor: "black", padding: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={{ marginTop: 20, textAlign: "center", color: "blue" }}>
          Create account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/forgot")}>
        <Text style={{ marginTop: 10, textAlign: "center", color: "blue" }}>
          Forgot password?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
