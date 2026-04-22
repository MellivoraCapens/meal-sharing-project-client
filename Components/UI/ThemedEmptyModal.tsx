import React from "react";
import { Keyboard, Modal, Platform, Pressable, View } from "react-native";

interface ThemedEmptyModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

const ThemedEmptyModal: React.FC<ThemedEmptyModalProps> = ({
  children,
  visible,
  onClose,
}) => {
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
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ThemedEmptyModal;
