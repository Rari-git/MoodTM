import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../theme/ThemeContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    const setupNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          // Ascunde navigation bar-ul
          await NavigationBar.setVisibilityAsync("hidden");
          
          // Setează comportamentul la swipe
          await NavigationBar.setBehaviorAsync('overlay-swipe');
          
          // Opțional: setează culoarea
          await NavigationBar.setBackgroundColorAsync('#00000000'); // Transparent
        } catch (error) {
          console.log('NavigationBar error:', error);
        }
      }
    };

    setupNavigationBar();
  }, []);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}