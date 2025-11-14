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
      <View style={{ flex: 1, padding: 24 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />

          <ThemedText style={{ fontSize: 32, fontWeight: "bold", marginTop: 12 }}>
            Your Profile
          </ThemedText>

          <ThemedText style={{ marginTop: 4 }}>
            View your info and preferences
          </ThemedText>
        </View>
        <View>
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 16,
                borderRadius: 14,
              }}
            >
              <ThemedText style={{ fontSize: 18 }}>
                Edit Profile
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 16,
                borderRadius: 14,
              }}
            >
              <ThemedText style={{ fontSize: 18 }}>
                Change Password
              </ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: 16,
              borderRadius: 14,
            }}
          >
            <ThemedText style={{ fontSize: 18 }}>
              Logout
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
