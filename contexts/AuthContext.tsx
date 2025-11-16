// contexts/AuthContext.tsx
import { useRouter, useSegments } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // <-- Importăm auth-ul nostru configurat

// Interfața se schimbă: nu mai stocăm token, ci obiectul User de la Firebase
interface AuthContextProps {
  user: User | null; // <-- Am schimbat din 'token' în 'user'
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  register: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // 1. Ne abonăm la starea de autentificare Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Setează utilizatorul (sau null dacă e delogat)
      setIsLoading(false);
    });

    // Curățăm abonarea când componenta se demolează
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // 2. Logica de "Gatekeeper" (rămâne aproape la fel)
    if (isLoading) return; 

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      // Utilizator logat, dar pe ecran de login -> trimite la app
      router.replace('/'); 
    } else if (!user && !inAuthGroup) {
      // Utilizator nelogat, dar pe ecran privat -> trimite la login
      router.replace('/(auth)/login');
    }

  }, [user, isLoading, segments, router]); // <-- Am înlocuit 'token' cu 'user'

  // Funcția de login acum apelează Firebase
  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Nu mai avem nevoie de setToken sau AsyncStorage, Firebase gestionează asta
    return signInWithEmailAndPassword(auth, email, pass)
      .finally(() => setIsLoading(false));
  };

  // Funcție nouă pentru register
  const register = async (email: string, pass: string) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass)
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    await signOut(auth);
    // Nu mai trebuie să ștergem manual token-ul
    // onAuthStateChanged va detecta schimbarea și va seta user=null
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};