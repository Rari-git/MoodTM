// app/(app)/_layout.tsx
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AppLayout() {
  const { isLoading } = useAuth();

  // Așteaptă ca AuthContext să se încarce înainte de a ascunde SplashScreen-ul
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // Nu randa nimic până nu e gata contextul
  if (isLoading) {
    return null;
  }
  
  return <Stack screenOptions={{ headerShown: false }} />;
}