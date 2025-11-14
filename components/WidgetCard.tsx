import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  subtitle: string;
};

export default function WidgetCard({ title, subtitle }: Props) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#f2f2f2",
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
      <Text style={{ color: "#555", marginTop: 4 }}>{subtitle}</Text>
    </TouchableOpacity>
  );
}
