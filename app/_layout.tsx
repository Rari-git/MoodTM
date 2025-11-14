import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
