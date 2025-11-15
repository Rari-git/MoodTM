import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Start() {
  const [isReady, setIsReady] = useState(false);
  const [route, setRoute] = useState<"/onboarding" | "/(auth)/login" | "/(tabs)/home" | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Așteaptă puțin pentru a evita flash-ul prea rapid
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const firstTime = await AsyncStorage.getItem("firstTime");
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        console.log("First time:", firstTime);
        console.log("Is logged in:", isLoggedIn);

        if (!firstTime) {
          setRoute("/onboarding");
        } else if (isLoggedIn !== "true") {
          setRoute("/(auth)/login");
        } else {
          setRoute("/(tabs)/home");
        }
      } catch (e) {
        console.error("Error checking auth:", e);
        setRoute("/(auth)/login");
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#6A85FF" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (route) {
    return <Redirect href={route} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#6A85FF" }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}