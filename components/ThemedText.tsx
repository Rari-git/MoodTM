import { Text, TextProps } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function ThemedText(props: TextProps) {
  const { fonts } = useTheme();

  return (
    <Text
      {...props}
      style={[
        { fontFamily: fonts.regular },
        props.style,
      ]}
    />
  );
}
