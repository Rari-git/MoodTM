import { api } from "../app/api/apiClient";

export type MoodType = "happy" | "sad" | "relaxed" | "energetic" | "angry";

export interface MoodEntry {
  id: number;
  mood: MoodType;
  note?: string;
  created_at: string;
}

export const moodService = {
  async addMood(mood: MoodType, note?: string) {
    const res = await api.post<MoodEntry>("/moods", { mood, note });
    return res.data;
  },

  async getMoods() {
    const res = await api.get<MoodEntry[]>("/moods");
    return res.data;
  },
};
