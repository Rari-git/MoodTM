// contexts/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personalizat pentru a folosi contextul
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider-ul
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // 1. Verifică dacă există un token salvat
    (async () => {
      try {
        const savedToken = await AsyncStorage.getItem('user_token');
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (e) {
        console.error("Failed to load auth token", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    // 2. Logica de "Gatekeeper"
    if (isLoading) return; // Nu face nimic cât timp se încarcă

    const inAuthGroup = segments[0] === '(auth)';

    if (token && inAuthGroup) {
      // Utilizator logat, dar pe ecran de login -> trimite la app
      router.replace('/'); 
    } else if (!token && !inAuthGroup) {
      // Utilizator nelogat, dar pe ecran privat -> trimite la login
      router.replace('/(auth)/login');
    }

  }, [token, isLoading, segments, router]);

  const login = async (newToken: string) => {
    // Salvează token-ul în state și în storage
    setToken(newToken);
    await AsyncStorage.setItem('user_token', newToken);
    router.replace('/'); // Redirecționează la app
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('user_token');
    router.replace('/(auth)/login'); // Redirecționează la login
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};