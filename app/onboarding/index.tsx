import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button, View } from "react-native";

export default function Onboarding() {
  const finish = async () => {
    await AsyncStorage.setItem("firstTime", "no");
    router.replace("/(auth)/register");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Get Started" onPress={finish} />
    </View>
  );
}
