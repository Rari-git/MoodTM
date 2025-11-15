import { create } from "zustand";
import { MoodEntry, moodService, MoodType } from "../api/moodService";

interface MoodStore {
  moods: MoodEntry[];
  loading: boolean;
  fetchMoods: () => Promise<void>;
  addMood: (mood: MoodType, note?: string) => Promise<void>;
}

export const useMoodStore = create<MoodStore>((set) => ({
  moods: [],
  loading: false,

  fetchMoods: async () => {
    set({ loading: true });
    const moods = await moodService.getMoods();
    set({ moods, loading: false });
  },

  addMood: async (mood, note) => {
    const newMood = await moodService.addMood(mood, note);
    set((state) => ({ moods: [newMood, ...state.moods] }));
  },
}));

