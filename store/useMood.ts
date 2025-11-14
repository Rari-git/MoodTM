import { create } from "zustand";
import type { Mood } from "../constants/moodColors";

type MoodState = {
  mood: Mood;
  setMood: (m: Mood) => void;
};

export const useMood = create<MoodState>((set) => ({
  mood: "happy",
  setMood: (m) => set({ mood: m }),
}));
