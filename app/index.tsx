import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Start() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const firstTime = await AsyncStorage.getItem("firstTime");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        console.log("firstTime:", firstTime);
        console.log("isLoggedIn:", isLoggedIn);

        // PRIMA DATĂ ÎN APP → ONBOARDING
        if (!firstTime) {
          router.replace("/onboarding");
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
  }, [router]);

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