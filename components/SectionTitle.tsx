import { View } from "react-native";
import ThemedText from "./ThemedText";

type Props = {
  text: string;
};

export default function SectionTitle({ text }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
<ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
  {text}
</ThemedText>
    </View>
  );
}
