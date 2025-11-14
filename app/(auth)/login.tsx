import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Logare
      </Text>

      <TextInput
        placeholder="Email"
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Parolă"
        secureTextEntry
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4c84ff",
          padding: 14,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Conectează-te
        </Text>
      </TouchableOpacity>

    </View>
  );
}
