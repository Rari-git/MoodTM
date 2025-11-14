import { View } from "react-native";
import ThemedText from "./ThemedText";

export default function SectionTitle({ text }: { text: string }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
        {text}
      </ThemedText>
    </View>
  );
}
