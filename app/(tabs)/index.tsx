
import { ScrollView, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import SectionTitle from "../../components/SectionTitle";
import WidgetCard from "../../components/WidgetCard";

export default function Home() {
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <HomeHeader />

      <SectionTitle text="Recommandations for you" />

      <View style={{ gap: 16 }}>
        <WidgetCard
          title="What's your mood?"
          subtitle="Set your mood for the day"
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
  );
}
