import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        const auto = await AsyncStorage.getItem("autoLogin");
        const logged = await AsyncStorage.getItem("loggedEmail"); // CORECTAT: loggedEmail în loc de loggedUsername

        if (auto === "true" && logged) {
          router.replace("/(tabs)/home");
        }
      } catch (e) {
        console.warn("Auto login check failed", e);
      }
    };

    checkAutoLogin();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}