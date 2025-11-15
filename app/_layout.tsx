import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ThemeProvider } from "../theme/ThemeContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" translucent />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </ThemeProvider>
  );
}
