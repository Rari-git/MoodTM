import { LinearGradient } from "expo-linear-gradient";
import { Image, TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/ThemedText";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

export default function Profile() {
  const mood = useMood((state) => state.mood);

  const bgColors = moodColors[mood].background;

  return (
    <LinearGradient colors={bgColors} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, gap: 24 }}>
        <View style={{ alignItems: "center", gap: 12, marginTop: 20 }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
          <ThemedText
            style={{ fontSize: 32, fontWeight: "bold", color: "#fff" }}
          >
            Your Profile
          </ThemedText>
          <ThemedText style={{ color: "rgba(255,255,255,0.8)" }}>
            View your info and preferences
          </ThemedText>
        </View>

        <View style={{ gap: 16 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            <ThemedText style={{ fontSize: 18, color: "#fff" }}>
              Edit Profile
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            <ThemedText style={{ fontSize: 18, color: "#fff" }}>
              Change Password
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            <ThemedText style={{ fontSize: 18, color: "#fff" }}>
              Logout
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
