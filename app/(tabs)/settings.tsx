import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Switch, View } from "react-native";
import ThemedText from "../../components/ThemedText";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

export default function Settings() {
  const mood = useMood((state) => state.mood);
  const bgColors = moodColors[mood].background; // ✅ tuple corect

  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <LinearGradient colors={bgColors} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, gap: 32 }}>
        <ThemedText
          style={{ fontSize: 32, fontWeight: "bold", color: "#fff" }}
        >
          Settings
        </ThemedText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 18, color: "#fff" }}>
            Notifications
          </ThemedText>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ fontSize: 18, color: "#fff" }}>
            Dark Mode
          </ThemedText>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View>
          <ThemedText
            style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}
          >
            Language
          </ThemedText>
          <ThemedText style={{ color: "#fff" }}>English (default)</ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}
