export const moodColors = {
  happy: {
    background: ["#FFE259", "#FFA751"] as const,
    card: ["#FFEE88", "#FFBB66"] as const,
  },
  sad: {
    background: ["#74ABE2", "#5563DE"] as const,
    card: ["#A7C5EB", "#6E85B7"] as const,
  },
  relaxed: {
    background: ["#8EC5FC", "#E0C3FC"] as const,
    card: ["#C9E9FF", "#B8C6FF"] as const,
  },
  energetic: {
    background: ["#f6d365", "#fda085"] as const,
    card: ["#FFB75E", "#ED8F03"] as const,
  },
  angry: {
    background: ["#CB356B", "#BD3F32"] as const,
    card: ["#FF6F6F", "#D95D39"] as const,
  },
} as const;
