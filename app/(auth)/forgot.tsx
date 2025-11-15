// app/(auth)/forgot.tsx
// app/(auth)/forgot.tsx
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../api/apiClient";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState(""); // username sau email
  const [msg, setMsg] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleReset = async () => {
    setMsg("");
    setNewPass("");

    if (!identifier) {
      setMsg("Introdu username sau email.");
      return;
    }

    try {
      const res = await api.post("/forgot", { identifier });

      setMsg(res.data.message || "Parola a fost resetată.");
      if (res.data.newPassword) {
        setNewPass(res.data.newPassword);
      }
    } catch (e: any) {
      console.log(e?.response?.data || e.message);
      setMsg(e?.response?.data?.error || "Eroare la resetare.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
        Reset Password
      </Text>

      <TextInput
        placeholder="Username sau Email"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TouchableOpacity
        onPress={handleReset}
        style={{
          backgroundColor: "#4c84ff",
          padding: 14,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Reset
        </Text>
      </TouchableOpacity>

      {msg.length > 0 && (
        <Text style={{ marginTop: 16, textAlign: "center" }}>{msg}</Text>
      )}

      {newPass.length > 0 && (
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Noua parolă: {newPass}
        </Text>
      )}

      <TouchableOpacity onPress={() => router.push("/(auth)/login" as any)}>
        <Text style={{ textAlign: "center", marginTop: 20, color: "#4c84ff" }}>
          Back to login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
