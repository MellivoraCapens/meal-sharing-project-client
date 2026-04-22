import React, { useEffect } from "react";
import { Image, Platform, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Hooks
import useImagePicker from "../Hooks/useImagePicker";
import ThemedText from "./UI/ThemedText";

interface CustomImageUploaderProps {
  onAddImage: (image: string) => void;
}

const CustomImageUploader: React.FC<CustomImageUploaderProps> = ({
  onAddImage,
}) => {
  const { image, pickImage, clearImage } = useImagePicker();

  useEffect(() => {
    if (image) {
      onAddImage(image);
    }
  }, [image]);

  return (
    <View
      className={
        (Platform.OS === "web" ? " h-full w-full " : "") +
        " max-w-[400px] max-h-[400px] items-center justify-center"
      }
    >
      <Pressable
        className="w-full bg-background-200/5 items-center justify-center rounded border border-neutral-400 overflow-hidden"
        style={{ aspectRatio: 1 }}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center justify-center">
            <Ionicons name="add-sharp" color={"#a3a3a3"} size={50} />
            <ThemedText className="text-neutral-400 font-thin">
              Click Here to Upload Image!
            </ThemedText>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default CustomImageUploader;
