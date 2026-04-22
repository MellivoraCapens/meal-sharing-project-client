import { Image, Pressable, useColorScheme, View } from "react-native";
import ThemedText from "../../../Components/UI/ThemedText";
import ThemedView from "../../../Components/UI/ThemedView";
import { useAuth } from "../../../Hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../../constants/Color";
import { useState } from "react";
import ThemedEmptyModal from "../../../Components/UI/ThemedEmptyModal";
import CustomImageUploader from "../../../Components/CustomImageUploader";

const Profile = () => {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];
  const [pictureModal, setPictureModal] = useState<boolean>(false);

  const { user } = useAuth();

  const [profilePicUri, setProfilePicUri] = useState(user?.profilePicture);

  return (
    <ThemedView isSafeArea className="flex-1 justify-center items-center">
      <View>
        <Pressable
          onPress={() => setPictureModal(true)}
          className={
            "w-32 h-32 rounded-full border self-center " +
            " dark:border-background-200/20 dark:bg-background-50/5" +
            " border-background-300/20 bg-background-950/5" +
            " active:opacity-50"
          }
        >
          {user?.profilePicture ? (
            <View>
              <Image
                source={{ uri: profilePicUri }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
          ) : (
            <View className=" flex-1 items-center justify-center">
              <Ionicons
                style={{ opacity: 0.4 }}
                name="image-outline"
                size={25}
                color={color.text}
              />
            </View>
          )}
          <View
            style={{ aspectRatio: 1 }}
            className=" absolute bottom-1 rounded-full right-1 bg-secondary-300 items-center justify-center"
          >
            <Ionicons name="add" size={25} />
          </View>
        </Pressable>
      </View>
      {pictureModal && (
        <ThemedEmptyModal
          visible={pictureModal}
          onClose={() => setPictureModal(false)}
        >
          <View className="">
            <CustomImageUploader
              onAddImage={(image) => setProfilePicUri(image)}
            />
          </View>
        </ThemedEmptyModal>
      )}
      <ThemedText textColor="text">{user?.fullname}</ThemedText>
    </ThemedView>
  );
};

export default Profile;
