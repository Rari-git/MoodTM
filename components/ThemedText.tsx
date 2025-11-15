import { Text, TextProps, TextStyle } from "react-native";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";

export default function ThemedText({ style, ...rest }: TextProps) {
  const mood = useMood((s) => s.currentMood); // CORECTAT: s.currentMood în loc de s.mood
  const textColor = moodColors[mood].text;

  // facem style întotdeauna array, ca să putem căuta fontWeight
  const styleArray: TextStyle[] = [];
  if (Array.isArray(style)) {
    styleArray.push(...(style as TextStyle[]));
  } else if (style) {
    styleArray.push(style as TextStyle);
  }

  let fontWeight: TextStyle["fontWeight"] | undefined;
  for (const s of styleArray) {
    if (!s) continue;
    if (s.fontWeight) {
      fontWeight = s.fontWeight;
    }
  }

  const numericWeight =
    typeof fontWeight === "string" && /^\d+$/.test(fontWeight)
      ? Number(fontWeight)
      : fontWeight;

  const isBold =
    fontWeight === "bold" ||
    (typeof numericWeight === "number" && numericWeight >= 600);

  return (
    <Text
      {...rest}
      style={[
        {
          color: textColor,
          fontFamily: isBold ? "Poppins-Bold" : "Poppins-Regular",
        },
        style,
      ]}
    />
  );
}