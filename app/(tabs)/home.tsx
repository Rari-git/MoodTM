import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


export default function Home() {
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<Text style={{ fontSize: 32, marginBottom: 20 }}>Home Screen</Text>


<TouchableOpacity
onPress={() => router.push("/profile")}
style={{ backgroundColor: "black", padding: 12, borderRadius: 8 }}
>
<Text style={{ color: "white" }}>Go to Profile</Text>
</TouchableOpacity>


<TouchableOpacity
onPress={() => router.push("/settings")}
style={{ marginTop: 20, backgroundColor: "gray", padding: 12, borderRadius: 8 }}
>
<Text style={{ color: "white" }}>Go to Settings</Text>
</TouchableOpacity>
</View>
);
}