import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import ThemedText from "../components/ThemedText";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";

export default function Profile() {
  const mood = useMood((s) => s.mood);
  const colors = moodColors[mood].background;

  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, marginTop: 50 }}>
        {/* HEADER */}
        <View style={{ alignItems: "center", gap: 12 }}>
          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
          <ThemedText style={{ fontSize: 32, fontWeight: "bold" }}>
            Your Profile
          </ThemedText>
          <ThemedText>View your info and preferences</ThemedText>
        </View>

        {/* ACTIONS */}
        <View style={{ marginTop: 32, gap: 16 }}>
          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <ThemedText>Edit profile</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <ThemedText>Change password</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 16,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <ThemedText>Logout</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
