import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";

export default function GradientIcon({
  name,
  size,
  focused,
}: {
  name: string;
  size: number;
  focused: boolean;
}) {
  const mood = useMood((state) => state.currentMood);

  const colors =
    mood && moodColors[mood]
      ? moodColors[mood].card
      : ["#8EC5FC", "#E0C3FC"];

  if (!focused) {
    return <Ionicons name={name as any} size={size} color="#a0a0a0" />;
  }

  return (
    <LinearGradient
      colors={colors as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={name as any} size={size - 4} color="white" />
    </LinearGradient>
  );
}
