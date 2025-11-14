import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Switch, View } from "react-native";
import ThemedText from "../components/ThemedText";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";

export default function Settings() {
  const mood = useMood((s) => s.mood);
  const colors = moodColors[mood].background;

  const [notifications, setNotifications] = React.useState(true);

  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, marginTop: 50 }}>
        <ThemedText style={{ fontSize: 32, fontWeight: "bold" }}>
          Settings
        </ThemedText>

        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 18 }}>Notifications</ThemedText>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View style={{ marginTop: 24 }}>
          <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
            Language
          </ThemedText>
          <ThemedText>English (default)</ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}
