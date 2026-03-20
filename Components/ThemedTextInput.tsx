import { Pressable, Text, TextInput, useColorScheme, View } from "react-native";

import colors from "../constants/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

interface ThemedTextInputProps {
  placeholder?: string;
  className?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  value?: string;
  id?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secure?: boolean;
  danger?: boolean;
  onChange?: (e: any) => void;
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  placeholder,
  className,
  secure,
  danger,
  ...props
}) => {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme].text;
  const placeHolderColor = colorScheme === "dark" ? "#8987a1" : "#706d8c";
  const [toggleSecure, setToggleSecure] = useState(secure);

  return (
    <View
      className={
        (danger && " border border-rose-600 ") +
        (className || "") +
        " dark:bg-background-100/30 bg-background-100 rounded flex-row justify-between "
      }
    >
      <TextInput
        {...props}
        placeholder={placeholder || ""}
        placeholderTextColor={placeHolderColor}
        style={{ color }}
        secureTextEntry={toggleSecure}
        className=" pl-2 py-2 outline-none flex-1"
      />
      {secure && (
        <Pressable
          className="p-2"
          onPress={() => setToggleSecure(!toggleSecure)}
        >
          <Ionicons
            name={toggleSecure ? "eye-off-outline" : "eye-outline"}
            size={16}
            color={placeHolderColor}
          />
        </Pressable>
      )}
    </View>
  );
};

export default ThemedTextInput;
