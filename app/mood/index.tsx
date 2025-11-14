import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../../components/ThemedText";
import { useMood } from "../../store/useMood";

export default function MoodPicker() {
  const setMood = useMood((state) => state.setMood);
  const router = useRouter();

  const handleSelect = (m: any) => {
    setMood(m);
    router.back(); // te întoarce la Home
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <ThemedText style={{ fontSize: 28, fontWeight: "700", marginBottom: 20 }}>
        Select your mood
      </ThemedText>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#FFE29F", borderRadius: 16, marginBottom: 12 }}
        onPress={() => handleSelect("happy")}
      >
        <ThemedText style={{ fontSize: 18 }}>😄 Happy</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#A7C5EB", borderRadius: 16, marginBottom: 12 }}
        onPress={() => handleSelect("sad")}
      >
        <ThemedText style={{ fontSize: 18 }}>😢 Sad</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#8EC5FC", borderRadius: 16, marginBottom: 12 }}
        onPress={() => handleSelect("relaxed")}
      >
        <ThemedText style={{ fontSize: 18 }}>😌 Relaxed</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#FFB75E", borderRadius: 16, marginBottom: 12 }}
        onPress={() => handleSelect("energetic")}
      >
        <ThemedText style={{ fontSize: 18 }}>⚡ Energetic</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#FF6F6F", borderRadius: 16 }}
        onPress={() => handleSelect("angry")}
      >
        <ThemedText style={{ fontSize: 18 }}>😡 Angry</ThemedText>
      </TouchableOpacity>
    </View>
  );
}
