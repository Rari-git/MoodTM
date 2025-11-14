import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";

type Props = {
  title: string;
  subtitle: string;
  onPress?: () => void; // <-- ADD THIS
};

export default function WidgetCard({ title, subtitle, onPress }: Props) {
  const mood = useMood((state) => state.mood);

  const colors =
    mood && moodColors[mood]
      ? moodColors[mood].card
      : ["#FFE29F", "#FF719A"] as const;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ borderRadius: 16, overflow: "hidden" }}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
          {title}
        </Text>
        <Text style={{ color: "#fff", marginTop: 4 }}>
          {subtitle}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
