import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../api/apiClient";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!username || !password) {
      setError("Completează toate câmpurile.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/register", {
        username,
        password,
      });

      router.replace("/(auth)/login");
    } catch (e: any) {
      console.log(e?.response?.data || e.message);
      setError(e?.response?.data?.error || "Eroare la înregistrare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "600", textAlign: "center", marginBottom: 30 }}>
        Register
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#888"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      {error.length > 0 && (
        <Text
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: "#4c84ff",
          padding: 14,
          borderRadius: 8,
          opacity: loading ? 0.7 : 1,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
          {loading ? "Se creează..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#4c84ff",
            fontSize: 14,
          }}
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
