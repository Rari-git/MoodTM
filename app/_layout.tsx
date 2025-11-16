// app/_layout.tsx
import * as NavigationBar from "expo-navigation-bar";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { MoodProvider, useMood } from "../contexts/MoodContext";

// Previne ascunderea automată a SplashScreen-ului
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isLoading: isAuthLoading } = useAuth();
  const { isLoading: isMoodLoading } = useMood();

  useEffect(() => {
    // Ascunde SplashScreen DOAR când AMBELE contexte s-au încărcat
    if (!isAuthLoading && !isMoodLoading) {
      SplashScreen.hideAsync();
    }
  }, [isAuthLoading, isMoodLoading]);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  // Nu randa nimic (păstrează SplashScreen vizibil)
  // până când contextele sunt gata.
  if (isAuthLoading || isMoodLoading) {
    return null;
  }

  // Acum e sigur să randăm restul aplicației
  return (
    <>
      <StatusBar hidden />
      <Slot /> 
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <MoodProvider>
        <RootLayoutNav />
      </MoodProvider>
    </AuthProvider>
  );
}