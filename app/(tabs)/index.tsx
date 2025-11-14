import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import WidgetCard from "../../components/WidgetCard";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

export default function Home() {
  const mood = useMood((state) => state.mood);
  const router = useRouter();

  const colors =
    mood && moodColors[mood]
      ? moodColors[mood].background
      : (["#8EC5FC", "#E0C3FC"] as const);

  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <HomeHeader />
        <View style={{ gap: 16 }}>
          {/* Open mood picker */}
          <WidgetCard
            title="What's your mood?"
            subtitle="Set your mood for the day"
            onPress={() => router.push("../mood")}
          />

          <WidgetCard
            title="What should I do today?"
            subtitle="Find activities based on your mood"
          />

          <WidgetCard
            title="Where should I eat today?"
            subtitle="Find restaurants based on your mood"
          />

          <WidgetCard
            title="What should I visit today?"
            subtitle="Find places to visit based on your mood"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
