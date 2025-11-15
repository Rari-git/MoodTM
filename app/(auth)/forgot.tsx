import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState(""); // username sau email
  const [message, setMessage] = useState("");
  const [newPass, setNewPass] = useState("");

  const generatePassword = () => Math.random().toString(36).slice(-8); // 8 chars

  const handleReset = async () => {
    setMessage("");
    setNewPass("");

    const stored = await AsyncStorage.getItem("users");
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    const idx = users.findIndex(
      (u) =>
        u.email.toLowerCase() === identifier.toLowerCase() ||
        u.name.toLowerCase() === identifier.toLowerCase()
    );

    if (idx === -1) {
      setMessage("Userul nu a fost găsit.");
      return;
    }

    const pass = generatePassword();
    users[idx].password = pass;

    await AsyncStorage.setItem("users", JSON.stringify(users));

    setNewPass(pass);
    setMessage(
      "Parola ta a fost resetată. Folosește parola de mai jos pentru login și schimb-o ulterior:"
    );
  };

  return (
    <LinearGradient
      colors={["#6A85FF", "#94B5FF"]}
      style={{ flex: 1, padding: 24, justifyContent: "center" }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          Reset Password
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#555",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Introdu username-ul sau emailul contului tău.
        </Text>

        <TextInput
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="Username or Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          style={{
            borderWidth: 2,
            borderColor: "#d0d4df",
            borderRadius: 12,
            paddingHorizontal: 12,
            height: 48,
            marginBottom: 16,
            backgroundColor: "#f8f9ff",
          }}
        />

        <TouchableOpacity
          onPress={handleReset}
          style={{
            backgroundColor: "#4c84ff",
            paddingVertical: 14,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text
            style={{
              textAlign: "center",
              color: "#4c84ff",
              marginTop: 8,
              fontSize: 14,
            }}
          >
            Back to login
          </Text>
        </TouchableOpacity>

        {message.length > 0 && (
          <View style={{ marginTop: 18 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: 8,
                fontSize: 14,
              }}
            >
              {message}
            </Text>
            {newPass ? (
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {newPass}
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
