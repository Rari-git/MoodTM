import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { TabView } from "react-native-tab-view";

const moodColors: Record<string, string> = {
  happy: "#FFE066",
  sad: "#A0C4FF",
  angry: "#FF6B6B",
  energetic: "#8AFF8A",
  bored: "#D3D3D3",
};

export default function MainIndex() {

  // 1️⃣ LOGIN CHECK — prima logică, dar NU returnăm încă
  const [logged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const u = await AsyncStorage.getItem("loggedUsername");
      setLogged(!!u);
    })();
  }, []);

  // 2️⃣ DEFINIM HOOK-URILE TAB-URILOR (trebuie să fie sus, înainte de CONDITIONAL RETURN)
  const layout = useWindowDimensions();

  const [mood, setMood] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState<
    { key: string; title: string; icon: React.ComponentProps<typeof Ionicons>["name"] }[]
  >([
    { key: "home", title: "Home", icon: "home" },
    { key: "profile", title: "Profile", icon: "person" },
    { key: "settings", title: "Settings", icon: "settings" },
  ]);

  useEffect(() => {
    (async () => {
      const savedMood = await AsyncStorage.getItem("mood");
      if (savedMood) setMood(savedMood);
    })();
  }, []);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  const selectMood = async (m: string) => {
    await AsyncStorage.setItem("mood", m);
    setMood(m);
  };

  // 3️⃣ ABIA ACUM — putem verifica LOGIN și RETURN
  if (logged === null) return null;
  if (!logged) return <Redirect href="/(auth)/login" />;

  // 4️⃣ USER IS LOGGED — restul aplicației
  const renderScene = ({ route }: { route: { key: string } }) => {
    const bg = mood ? moodColors[mood] : "white";

    switch (route.key) {
      case "home":
        return (
          <View style={[styles.scene, { backgroundColor: bg }]}>
            <Text style={styles.title}>Welcome to MoodTM</Text>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={async () => {
                await AsyncStorage.removeItem("mood");
                setMood(null);
              }}
            >
              <Text style={styles.actionText}>Change Mood</Text>
            </TouchableOpacity>
          </View>
        );

      case "profile":
        return (
          <View style={[styles.scene, { backgroundColor: bg }]}>
            <Text style={styles.title}>Profile</Text>

            {/* Logout */}
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#c62828" }]}
              onPress={async () => {
                await AsyncStorage.removeItem("loggedUsername");
                setLogged(false);
              }}
            >
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        );

      case "settings":
        return (
          <View style={[styles.scene, { backgroundColor: bg }]}>
            <Text style={styles.title}>Settings</Text>
          </View>
        );

      default:
        return null;
    }
  };

  // 5️⃣ MOOOD SELECT
  if (!mood) {
    return (
      <View style={styles.moodScreen}>
        <StatusBar hidden />

        <Text style={styles.moodTitle}>Choose your mood</Text>

        <View style={styles.moodButtons}>
          <TouchableOpacity style={styles.moodBtn} onPress={() => selectMood("happy")}>
            <Text style={styles.moodText}>😄 Happy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodBtn} onPress={() => selectMood("sad")}>
            <Text style={styles.moodText}>😢 Sad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodBtn} onPress={() => selectMood("angry")}>
            <Text style={styles.moodText}>😡 Angry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodBtn} onPress={() => selectMood("energetic")}>
            <Text style={styles.moodText}>⚡ Energetic</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodBtn} onPress={() => selectMood("bored")}>
            <Text style={styles.moodText}>😐 Bored</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 6️⃣ MAIN APP
  const bgColor = moodColors[mood] || "white";

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar hidden />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
      />

      <View style={[styles.tabBar, { backgroundColor: bgColor }]}>
        {routes.map((route, i) => (
          <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => setIndex(i)}>
            <Ionicons name={route.icon} size={26} color={i === index ? "black" : "#555"} />
            <Text style={{ color: i === index ? "black" : "#555", fontSize: 12 }}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  moodScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  moodTitle: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
  },
  moodButtons: {
    width: "100%",
    gap: 15,
  },
  moodBtn: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
  },
  moodText: {
    fontSize: 20,
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#999",
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#444",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
  },
});
