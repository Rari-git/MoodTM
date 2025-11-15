import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";
import ThemedText from "./ThemedText";

type WidgetCardProps = {
  title: string;
  subtitle: string;
  icon: string;
  onPress?: () => void;
};

export default function WidgetCard({ title, subtitle, icon, onPress }: WidgetCardProps) {
  const mood = useMood((s) => s.currentMood);
  const colors = moodColors[mood].background;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={colors}
        style={{
          padding: 18,
          borderRadius: 20,
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 24 }}>{icon}</ThemedText>
        </View>

        <View style={{ flex: 1 }}>
          <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
            {title}
          </ThemedText>
          <ThemedText>{subtitle}</ThemedText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
