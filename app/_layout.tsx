import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, Platform, View } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // 👉 Activăm immersive sticky + îl reaplicăm după ALT-TAB
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const applyImmersive = async () => {
      await NavigationBar.setVisibilityAsync("hidden"); // ascunde bara
      await NavigationBar.setBehaviorAsync("overlay-swipe"); // apare la glisare
    };

    applyImmersive();

    // reaplicăm când revii din background
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") applyImmersive();
    });

    return () => sub.remove();
  }, []);

  if (!loaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
