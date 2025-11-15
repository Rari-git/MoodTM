import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Start() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      try {
        const firstTime = await AsyncStorage.getItem("firstTime");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        console.log("First time:", firstTime);
        console.log("Is logged in:", isLoggedIn);

        if (!firstTime) {
          router.replace("/onboarding");
        } else if (isLoggedIn !== "true") {
          router.replace("/(auth)/login");
        } else {
          router.replace("/(main)/home");
        }
      } catch (e) {
        console.error("Error checking auth:", e);
        router.replace("/(auth)/login");
      }
    };

    check();
  }, [router]);

  return <View style={{ flex: 1, backgroundColor: "white" }} />;
}