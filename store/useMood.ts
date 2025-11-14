import { create } from "zustand";
import type { Mood } from "../constants/moodColors";

type MoodState = {
  mood: Mood;
  setMood: (mood: Mood) => void;
};

export const useMood = create<MoodState>((set) => ({
  mood: "happy", // 👈 default
  setMood: (mood) => set({ mood }),
}));
