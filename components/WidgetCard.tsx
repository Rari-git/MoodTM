import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";
import ThemedText from "./ThemedText";

type Props = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function WidgetCard({ title, subtitle, onPress }: Props) {
  const mood = useMood((state) => state.mood);

  const colors =
    mood && moodColors[mood]
      ? moodColors[mood].card
      : (["#FFE29F", "#FF719A"] as const);

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
        <ThemedText
          style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}
        >
          {title}
        </ThemedText>

        <ThemedText style={{ color: "#fff", marginTop: 4 }}>
          {subtitle}
        </ThemedText>
      </LinearGradient>
    </TouchableOpacity>
  );
}
