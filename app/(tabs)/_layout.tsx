import { Tabs } from "expo-router";
import React from "react";
import GradientIcon from "../../components/GradientIcon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          padding: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <GradientIcon
              name={focused ? "home" : "home-outline"}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <GradientIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, size }) => (
            <GradientIcon
              name={focused ? "settings" : "settings-outline"}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}