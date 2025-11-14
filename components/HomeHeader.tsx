import { View } from "react-native";
import ThemedText from "./ThemedText";

export default function HomeHeader() {
  return (
    <View style={{ marginBottom: 24 }}>
      <ThemedText style={{ fontSize: 38, fontWeight: "bold" }}>
        Welcome!
      </ThemedText>
    </View>
  );
}
