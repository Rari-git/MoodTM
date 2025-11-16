// firebaseConfig.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics"; // <-- AM ADĂUGAT ACEST IMPORT
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth/react-native';

// Acestea sunt cheile tale
const firebaseConfig = {
  apiKey: "AIzaSyAxateYHSe8rg5U4igG1XTeSPD_6Egiv_4",
  authDomain: "moodtm-fd2e7.firebaseapp.com",
  projectId: "moodtm-fd2e7",
  storageBucket: "moodtm-fd2e7.firebasestorage.app",
  messagingSenderId: "627600735948",
  appId: "1:627600735948:web:033676809ab4b03e3a0c69",
  measurementId: "G-08YGH9VM9M"
};

// Inițializează Firebase
const app = initializeApp(firebaseConfig);

// Inițializează Analytics
const analytics = getAnalytics(app);

// Inițializează Auth cu persistență locală
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Exportăm doar 'auth' deocamdată,
// deoarece 'AuthContext' are nevoie doar de el.
export { auth };
