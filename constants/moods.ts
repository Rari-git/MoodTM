export type MoodType = "happy" | "sad" | "angry" | "energetic" | "bored" | null;

export interface MoodConfig {
  background: any;
  gradient: string[];
  primaryColor: string;
}

export const moodConfig: Record<string, MoodConfig> = {
  happy: {
    background: require("../assets/images/background/backgroundHappy.png"),
    gradient: ["#fbe764", "#FFC300"],
    primaryColor: "#FFC300",
  },
  sad: {
    background: require("../assets/images/background/backgroundSad.png"),
    gradient: ["#7b9dde", "#425c90"],
    primaryColor: "#425c90",
  },
  angry: {
    background: require("../assets/images/background/backgroundAngry.png"),
    gradient: ["#f24c4c", "#a42d2d"],
    primaryColor: "#a42d2d",
  },
  energetic: {
    background: require("../assets/images/background/backgroundEnergetic.png"),
    gradient: ["#95f295", "#3ED63E"],
    primaryColor: "#3ED63E",
  },
  bored: {
    background: require("../assets/images/background/backgroundBored.png"),
    gradient: ["#cdc8c8", "#989898"],
    primaryColor: "#989898",
  },
};

export const moodData = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "sad", label: "Sad", emoji: "😢" },
  { key: "angry", label: "Angry", emoji: "😠" },
  { key: "energetic", label: "Energetic", emoji: "⚡" },
  { key: "bored", label: "Bored", emoji: "😐" },
];