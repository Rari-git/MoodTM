import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [status, setStatus] = useState<"loading" | "loggedIn" | "loggedOut">(
    "loading"
  );

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const value = await AsyncStorage.getItem("isLoggedIn");
        if (value === "true") {
          setStatus("loggedIn");
        } else {
          setStatus("loggedOut");
        }
      } catch (e) {
        console.log(e);
        setStatus("loggedOut");
      }
    };

    checkLogin();
  }, []);

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "loggedIn") {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
