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

        if (!firstTime) {
          // prima dată în aplicație
          router.replace("./onboarding");
        } else if (!isLoggedIn) {
          // a mai intrat, dar nu e logat
          router.replace("/(auth)/login");
        } else {
          // e logat
          router.replace("./main");
        }
      } catch (e) {
        // fallback: dacă ceva crapă, du-l măcar la login
        router.replace("/(auth)/login");
      }
    };

    check();
  }, [router]);

  // ecran gol cât timp decidem unde să-l trimitem
  return <View style={{ flex: 1, backgroundColor: "white" }} />;
}
