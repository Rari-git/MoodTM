import { ScrollView, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import SectionTitle from "../components/SectionTitle";
import WidgetCard from "../components/WidgetCard";

export default function Home() {
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <HomeHeader />

      <SectionTitle text="Recomandări pentru tine" />

      <View style={{ gap: 16 }}>
        <WidgetCard
          title="Workout Daily"
          subtitle="Antrenament rapid de 10 minute"
        />
        <WidgetCard
          title="Mindfulness"
          subtitle="Exercițiu simplu pentru relaxare"
        />
        <WidgetCard
          title="Track Mood"
          subtitle="Notează-ți starea zilei"
        />
      </View>
    </ScrollView>
  );
}
