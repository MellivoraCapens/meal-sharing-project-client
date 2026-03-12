import React from "react";
import { Pressable, useColorScheme } from "react-native";
import colors from "../constants/Color";

interface ThemedButtonProps {
  children: React.ReactNode;
  buttonColor?: Colors;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  buttonColor,
  className,
  ...props
}) => {
  const colorSheme = useColorScheme() || "light";
  const backgroundColor = buttonColor
    ? colors[colorSheme][buttonColor]
    : colors[colorSheme].primary;

  return (
    <Pressable
      className={(className || "") + " active:opacity-50 "}
      {...props}
      style={buttonColor && { backgroundColor }}
    >
      {children}
    </Pressable>
  );
};

export default ThemedButton;
