import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {

  const logout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>Profile</Text>

      <TouchableOpacity onPress={logout} style={{ marginTop: 20 }}>
        <Text style={{ color: "red" }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
