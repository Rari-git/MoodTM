import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const stored = await AsyncStorage.getItem("users");
    const users = stored ? JSON.parse(stored) : [];

    if (!users.some((u: any) => u.email === email)) {
      alert("Nu există acest email");
      return;
    }

    alert("Ți-am resetat parola (mock).");
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, marginBottom: 20, textAlign: "center" }}>
        Reset Password
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={handleReset}
        style={{ backgroundColor: "black", padding: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
