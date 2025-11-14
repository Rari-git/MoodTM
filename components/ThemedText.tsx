import { Text, TextProps } from "react-native";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";
import { useTheme } from "../theme/ThemeContext";

export default function ThemedText(props: TextProps) {
  const { fonts } = useTheme();
  const mood = useMood((state) => state.mood);

  const currentColor =
    mood && moodColors[mood] ? moodColors[mood].text : "#000";

  return (
    <Text
      {...props}
      style={[
        { 
          fontFamily: fonts.regular,
          color: currentColor, // 👉 automat după mood
        },
        props.style,
      ]}
    />
  );
}
