import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { ThemeProvider } from "../theme/ThemeContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (Platform.OS === "android") {
      // 👉 ascunde bara de jos (gestures only)
      NavigationBar.setVisibilityAsync("hidden");

      // 👉 activează immersive sticky (glisezi în sus ca să apară)
      NavigationBar.setBehaviorAsync("overlay-swipe");
    }
  }, []);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeProvider>
  );
}
