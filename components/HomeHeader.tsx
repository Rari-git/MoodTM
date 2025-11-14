import { Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>
        Bine ai revenit 👋
      </Text>
      <Text style={{ fontSize: 16, color: "#555" }}>
        Ce vrei să facem azi?
      </Text>
    </View>
  );
}
