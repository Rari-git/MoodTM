import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, G, Mask, Rect } from "react-native-svg";
import { moodColors } from "../constants/moodColors";
import { useMood } from "../store/useMood";

export default function GradientIcon({
  name,
  focused,
  size,
}: {
  name: string;
  focused: boolean;
  size: number;
}) {
  const mood = useMood((state) => state.mood);

  const colors =
    mood && moodColors[mood]
      ? moodColors[mood].card
      : ["#8EC5FC", "#E0C3FC"];

  return (
    <Svg width={size} height={size}>
      <Defs>
        {/* MASK: icon → folosit ca șablon */}
        <Mask id="iconMask">
          <G>
            <Ionicons name={name as any} size={size} color="white" />
          </G>
        </Mask>
      </Defs>

      {/* Gradient aplicat peste mască */}
      <LinearGradient
        colors={colors as any}
        start={[0, 0]}
        end={[1, 1]}
        style={{ width: size, height: size }}
      >
        <Rect
          width={size}
          height={size}
          fill="url(#gradient)" // ignorat, mask-ul face munca
          mask="url(#iconMask)"
        />
      </LinearGradient>
    </Svg>
  );
}
