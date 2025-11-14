import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { moodColors } from "../../constants/moodColors";
import { useMood } from "../../store/useMood";

export default function TabsLayout() {
  const mood = useMood((state) => state.mood);

  const colors =
    mood && moodColors[mood]
      ? moodColors[mood].background
      : ["#8EC5FC", "#E0C3FC"];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#000000ff",
        tabBarInactiveTintColor: "#ffffffff",

        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          height: 70,
          position: "absolute",
          elevation: 0,
        },

        // Gradient background for the tab bar
        tabBarBackground: () => (
          <LinearGradient
            colors={colors as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
