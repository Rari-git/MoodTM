import { Text, View } from "react-native";

type Props = {
  text: string;
};

export default function SectionTitle({ text }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{text}</Text>
    </View>
  );
}
