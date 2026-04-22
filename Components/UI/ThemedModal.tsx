import React from "react";
import ThemedView from "./ThemedView";
import {
  Keyboard,
  Modal,
  Platform,
  Pressable,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../constants/Color";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

interface ThemedModalProps {
  visible: boolean;
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

const ThemedModal: React.FC<ThemedModalProps> = ({
  children,
  visible,
  title,
  onClose,
}) => {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];

  return (
    <Modal transparent visible={visible}>
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 items-center justify-center cursor-default"
      >
        <Pressable
          onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
          className="cursor-default"
        >
          <View
            style={{ backgroundColor: color.background }}
            className={" overflow-hidden rounded min-w-96"}
          >
            <View className="flex-row justify-between p-2 border-b border-white/10 bg-accent-300 items-end">
              <ThemedText className=" text-lg ml-4 text-text-950">
                {title}
              </ThemedText>
              <ThemedButton
                className="bg-secondary-300 rounded self-end"
                onPress={onClose}
              >
                <Ionicons
                  color={colors.dark.text}
                  name="close-outline"
                  size={30}
                />
              </ThemedButton>
            </View>
            <View className="my-3 items-center justify-center">{children}</View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ThemedModal;
