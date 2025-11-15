import { Mood } from "@/constants/moodColors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { MoodEntry, moodService } from "../app/api/moodService";

interface MoodStore {
  // Pentru mood-ul curent (selected)
  currentMood: Mood;
  setCurrentMood: (mood: Mood) => void;
  
  // Pentru istoricul mood-urilor (entries)
  moodEntries: MoodEntry[];
  loading: boolean;
  fetchMoods: () => Promise<void>;
  addMoodEntry: (mood: Mood, note?: string) => Promise<void>;
}

export const useMood = create<MoodStore>()(
  persist(
    (set, get) => ({
      // Current mood state - default la "happy"
      currentMood: "happy",
      setCurrentMood: (mood: Mood) => set({ currentMood: mood }),

      // Mood entries/history state
      moodEntries: [],
      loading: false,

      fetchMoods: async () => {
        set({ loading: true });
        try {
          const moods = await moodService.getMoods();
          set({ moodEntries: moods, loading: false });
        } catch (error) {
          console.error("Error fetching moods:", error);
          set({ loading: false });
        }
      },

      addMoodEntry: async (mood: Mood, note?: string) => {
        try {
          const newMood = await moodService.addMood(mood, note);
          set((state) => ({ 
            moodEntries: [newMood, ...state.moodEntries],
            currentMood: mood // Setează și mood-ul curent
          }));
        } catch (error) {
          console.error("Error adding mood:", error);
          throw error;
        }
      },
    }),
    {
      name: 'mood-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        currentMood: state.currentMood,
        moodEntries: state.moodEntries 
      }),
    }
  )
);