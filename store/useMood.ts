import { create } from "zustand";

type MoodType = "happy" | "sad" | "relaxed" | "energetic" | "angry" | null;

interface MoodStore {
  mood: MoodType;
  setMood: (mood: MoodType) => void;
}

export const useMood = create<MoodStore>((set) => ({
  mood: null,
  setMood: (mood) => set({ mood }),
}));
