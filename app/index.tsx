import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useMood } from "../store/useMood";

export default function Start() {
  const router = useRouter();
  const { currentMood } = useMood(); // dacă vrei să refaci ruta când se schimbă mood-ul

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // mic delay doar ca să vezi loaderul, nu e obligatoriu
        await new Promise((resolve) => setTimeout(resolve, 800));

        const firstTime = await AsyncStorage.getItem("firstTime");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        console.log("firstTime:", firstTime);
        console.log("isLoggedIn:", isLoggedIn);
        console.log("currentMood:", currentMood);

        // PRIMA DATĂ ÎN APP → du-l la REGISTER
        if (!firstTime) {
          await AsyncStorage.setItem("firstTime", "true");
          router.replace("/(auth)/register");
          return;
        }

        // NU E LOGAT → LOGIN
        if (isLoggedIn !== "true") {
          router.replace("/(auth)/login");
          return;
        }

        // ESTE LOGAT → DIRECT ÎN TABS (HOME)
        router.replace("/(tabs)/home");
      } catch (e) {
        console.error("Error checking auth:", e);
        router.replace("/(auth)/login");
      }
    };

    checkAuth();
  }, [currentMood, router]);

  // ecran de loading cât timp decidem unde să-l trimitem
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6A85FF",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
