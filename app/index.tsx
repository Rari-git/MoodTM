import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { TabView } from "react-native-tab-view";

export default function MainTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: "home", title: "Home", icon: "home" },
    { key: "profile", title: "Profile", icon: "person" },
    { key: "settings", title: "Setări", icon: "settings" },
  ];

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  const renderScene = ({ route }: { route: { key: string } }) => (
    <View style={styles.scene}>
      <Text style={styles.text}>{route.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* 🔥 Ascundem status bar și bara de notificări */}
      <StatusBar hidden />

      {/* Swipe pages */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null} // scoatem tab bar-ul default
      />

      {/* Bottom custom tab bar */}
      <View style={styles.tabBar}>
        {routes.map((r, i) => (
          <TouchableOpacity key={r.key} onPress={() => setIndex(i)} style={styles.tabItem}>
            <Ionicons name={r.icon} size={24} color={index === i ? "black" : "gray"} />
            <Text style={{ color: index === i ? "black" : "gray" }}>{r.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});
