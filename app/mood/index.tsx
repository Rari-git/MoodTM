import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Mood, moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

const moods: { id: Mood; emoji: string; name: string }[] = [
  { id: "happy", emoji: "😊", name: "Happy" },
  { id: "sad", emoji: "😢", name: "Sad" },
  { id: "relaxed", emoji: "😌", name: "Relaxed" },
  { id: "energetic", emoji: "⚡", name: "Energetic" },
  { id: "angry", emoji: "😠", name: "Angry" },
];

export default function ChooseMood() {
  const { setCurrentMood, addMoodEntry } = useMood();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const params = useLocalSearchParams();
  
  // Detectează automat dacă vine din profil
  const isFromProfile = params.from === "profile";

  const handleMoodSelect = (moodId: Mood) => {
    setSelectedMood(moodId);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = async () => {
    if (selectedMood) {
      try {
        setCurrentMood(selectedMood);
        await addMoodEntry(selectedMood, "Daily mood selection");
        router.replace("/(tabs)/home");
      } catch (error) {
        console.error("Error saving mood:", error);
        router.replace("/(tabs)/home");
      }
    }
  };

  const handleChangeMood = async (moodId: Mood) => {
    try {
      setCurrentMood(moodId);
      await addMoodEntry(moodId, "Mood changed");
      router.back();
    } catch (error) {
      console.error("Error changing mood:", error);
      router.back();
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isFromProfile ? "Change your mood" : "How are you feeling today?"}
        </Text>
        <Text style={styles.subtitle}>
          {isFromProfile ? "Select your new mood" : "Choose your current mood"}
        </Text>

        <View style={styles.moodGrid}>
          {moods.map((mood) => {
            const colors = moodColors[mood.id];
            return (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodItem,
                  selectedMood === mood.id && styles.moodItemSelected,
                ]}
                onPress={() => {
                  if (isFromProfile) {
                    handleChangeMood(mood.id);
                  } else {
                    handleMoodSelect(mood.id);
                  }
                }}
              >
                <LinearGradient
                  colors={colors.background}
                  style={styles.moodGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={[styles.moodName, { color: colors.text }]}>
                    {mood.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {!isFromProfile && (
          <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedMood && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!selectedMood}
            >
              <Text style={styles.continueButtonText}>
                Continue to App
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {isFromProfile && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 50,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 40,
  },
  moodItem: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  moodItemSelected: {
    transform: [{ scale: 1.05 }],
    shadowColor: "#fff",
    shadowOpacity: 0.6,
  },
  moodGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#667eea",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});