import React from "react";
import { Text, useColorScheme } from "react-native";
import colors from "../constants/Color";

const TEXT_SIZES = {
  xs: " text-xs ",
  sm: " text-sm ",
  lg: " text-lg ",
  xl: " text-xl",
  "2xl": " text-2xl ",
  "3xl": " text-3xl ",
  "4xl": " text-4xl ",
  "5xl": " text-5xl ",
  "6xl": " text-6xl ",
  "7xl": " text-7xl ",
  "8xl": " text-8xl ",
  "9xl": " text-9xl ",
};

interface ThemedTextProps {
  children: React.ReactNode;
  className?: string;
  textColor?: Colors;
  size?: TextSizes;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  size,
  className,
  textColor,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const color = textColor && colors[colorScheme][textColor];

  const textSize = size ? TEXT_SIZES[size] : " text-base ";

  return (
    <Text
      style={color ? { color } : {}}
      className={(className || "") + textSize}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
