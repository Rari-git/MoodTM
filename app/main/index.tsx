import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

// importăm ecranele
import Home from "../home";
import Profile from "../profile";
import Settings from "../settings";

export default function MainScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

  const goTo = (p: number) => {
    pagerRef.current?.setPage(p);
    setPage(p);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* SWIPE VIEW */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View key="home">
          <Home />
        </View>

        <View key="profile">
          <Profile />
        </View>

        <View key="settings">
          <Settings />
        </View>
      </PagerView>

      {/* TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => goTo(0)} style={styles.tabItem}>
          <Ionicons
            name="home-outline"
            size={26}
            color={page === 0 ? "#000" : "#aaa"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goTo(1)} style={styles.tabItem}>
          <Ionicons
            name="person-circle-outline"
            size={26}
            color={page === 1 ? "#000" : "#aaa"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goTo(2)} style={styles.tabItem}>
          <Ionicons
            name="settings-outline"
            size={26}
            color={page === 2 ? "#000" : "#aaa"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
  },
  tabItem: {
    padding: 10,
  },
});
