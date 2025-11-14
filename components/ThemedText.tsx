import { Text, TextProps, TextStyle } from "react-native";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";
import { useTheme } from "../theme/ThemeContext";

export default function ThemedText({ style, ...rest }: TextProps) {
  const { fonts } = useTheme();
  const mood = useMood((s) => s.mood);

  const textColor = moodColors[mood].text;

  // detect bold
  const styleArray = Array.isArray(style) ? style : [style];
  const isBold =
    styleArray.some((s) => {
      const st = s as TextStyle;
      return (
        st?.fontWeight === "bold" ||
        Number(st?.fontWeight) >= 600
      );
    }) ?? false;

  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: isBold ? fonts.bold : fonts.regular,
          color: textColor,
        },
        style,
      ]}
    />
  );
}
