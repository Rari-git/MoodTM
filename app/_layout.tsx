import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, Platform, View } from "react-native";
import { ThemeProvider } from "../theme/ThemeContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // 👇👇👇 AICI ESTE USEEFFECT 👇👇👇
  useEffect(() => {
    if (Platform.OS === "android") {
      const applyImmersive = () => {
        NavigationBar.setBehaviorAsync("inset-swipe");
        NavigationBar.setVisibilityAsync("hidden");
      };

      // prima aplicație
      applyImmersive();

      // reaplicare după ALT+TAB
      const subscription = AppState.addEventListener("change", (state) => {
        if (state === "active") {
          applyImmersive();
        }
      });

      return () => subscription.remove();
    }
  }, []);
  // 👆👆👆 AICI SE TERMINĂ USEEFFECT 👆👆👆


  if (!loaded) return null;

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <StatusBar translucent style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeProvider>
  );
}
