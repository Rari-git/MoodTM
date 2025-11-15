import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await AsyncStorage.getItem("isLoggedIn");
      if (logged === "true") router.replace("/(tabs)/home");
      else router.replace("/(auth)/login");

      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) return null;

  return <Slot />;
}
