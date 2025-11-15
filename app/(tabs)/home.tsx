import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import ThemedText from "../../components/ThemedText";
import WidgetCard from "../../components/WidgetCard";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

export default function Home() {
  const mood = useMood((s) => s.currentMood);
  const colors = moodColors[mood].background;
  const router = useRouter();

  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER CARD */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            padding: 20,
            borderRadius: 20,
            flexDirection: "row",
            gap: 15,
            marginTop: 40,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/150" }}
            style={{ width: 55, height: 55, borderRadius: 27.5 }}
          />
          <View style={{ flex: 1 }}>
            <ThemedText style={{ fontSize: 26, fontWeight: "bold" }}>
              Welcome!
            </ThemedText>
            <ThemedText>Your daily mood companion</ThemedText>
          </View>
        </View>

        {/* SECTION TITLE */}
        <View style={{ marginTop: 30 }}>
          <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
            Recommendations for you
          </ThemedText>
        </View>

        {/* WIDGETS */}
        <View style={{ gap: 20, marginTop: 16 }}>
          <WidgetCard
            title="What's your mood?"
            subtitle="Set your mood for the day"
            icon="🌤️"
            onPress={() => router.push("/mood")}
          />
          <WidgetCard
            title="What should I do today?"
            subtitle="Find activities based on your mood"
            icon="🎯"
          />
          <WidgetCard
            title="Where should I eat today?"
            subtitle="Find restaurants based on your mood"
            icon="🍽️"
          />
          <WidgetCard
            title="What should I visit today?"
            subtitle="Find places to visit based on your mood"
            icon="📍"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}