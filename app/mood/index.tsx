import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
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
        gap: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Select your mood</Text>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#FFE29F", borderRadius: 16 }}
        onPress={() => handleSelect("happy")}
      >
        <Text style={{ fontSize: 18 }}>😄 Happy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#A7C5EB", borderRadius: 16 }}
        onPress={() => handleSelect("sad")}
      >
        <Text style={{ fontSize: 18 }}>😢 Sad</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#8EC5FC", borderRadius: 16 }}
        onPress={() => handleSelect("relaxed")}
      >
        <Text style={{ fontSize: 18 }}>😌 Relaxed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#FFB75E", borderRadius: 16 }}
        onPress={() => handleSelect("energetic")}
      >
        <Text style={{ fontSize: 18 }}>⚡ Energetic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: "#FF6F6F", borderRadius: 16 }}
        onPress={() => handleSelect("angry")}
      >
        <Text style={{ fontSize: 18 }}>😡 Angry</Text>
      </TouchableOpacity>
    </View>
  );
}
