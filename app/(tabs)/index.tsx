import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import ThemedText from "../../components/ThemedText";
import WidgetCard from "../../components/WidgetCard";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

export default function Home() {
  const mood = useMood((s) => s.mood);
  const colors = moodColors[mood].background;
  const router = useRouter();

  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingTop: 60,
          paddingBottom: 120,
          gap: 30,
        }}
      >
        {/* HEADER CARD */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            padding: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            backdropFilter: "blur(10px)",
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
            <ThemedText style={{ opacity: 0.8 }}>
              Your daily mood companion
            </ThemedText>
          </View>
        </View>

        {/* SECTION TITLE */}
        <View style={{ marginTop: 10 }}>
          <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
            Recommendations for you
          </ThemedText>
        </View>

        {/* WIDGETS LIST */}
        <View style={{ gap: 20 }}>
          <WidgetCard
            title="What's your mood?"
            subtitle="Set your mood for the day"
            icon="🌤️"
            onPress={() => router.push("../mood")}
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
