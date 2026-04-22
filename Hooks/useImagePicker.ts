import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const clearImage = () => setImage(null);

  return { image, pickImage, clearImage };
};

export default useImagePicker;
