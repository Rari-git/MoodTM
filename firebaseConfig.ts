import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxateYHSe8rg5U4igG1XTeSPD_6Egiv_4",
  authDomain: "moodtm-fd2e7.firebaseapp.com",
  projectId: "moodtm-fd2e7",
  storageBucket: "moodtm-fd2e7.firebasestorage.app",
  messagingSenderId: "627600735948",
  appId: "1:627600735948:web:033676809ab4b03e3a0c69",
  measurementId: "G-08YGH9VM9M"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);