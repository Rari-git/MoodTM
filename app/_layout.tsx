// app/_layout.tsx
import * as NavigationBar from "expo-navigation-bar";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext"; // <-- 1. Importă AuthProvider
import { MoodProvider } from "../contexts/MoodContext";

// Previne ascunderea automată a SplashScreen-ului
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  // Logica pentru immersive mode (rămâne la fel)
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    // 2. Îmbracă totul în AuthProvider (exterior)
    <AuthProvider>
      {/* 3. MoodProvider în interior */}
      <MoodProvider>
        <StatusBar hidden />
        {/* Slot va randa grupul (app) sau (auth) */}
        <Slot /> 
      </MoodProvider>
    </AuthProvider>
  );
}