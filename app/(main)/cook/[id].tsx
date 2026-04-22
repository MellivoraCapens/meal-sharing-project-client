import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedView from "../../../Components/UI/ThemedView";
import ThemedText from "../../../Components/UI/ThemedText";
import { useDish } from "../../../Hooks/useDish";
import { useEffect, useState } from "react";
import ThemedLoader from "../../../Components/UI/ThemedLoader";
import {
  Image,
  Platform,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../../constants/Color";
import ThemedButton from "../../../Components/UI/ThemedButton";
import ThemedEmptyModal from "../../../Components/UI/ThemedEmptyModal";
import CustomImageUploader from "../../../Components/CustomImageUploader";
import { useTags } from "../../../Hooks/useTags";
import * as Localization from "expo-localization";

const DishDetail = () => {
  const language =
    Localization.getLocales()[0].languageCode === "tr" ? "tr" : "en";
  const [dish, setDish] = useState<DishType | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);
  const { id } = useLocalSearchParams();
  const { getMyDishById, updateDishImage, updateDishStatus } = useDish();
  const { tags } = useTags();

  const [imageUri, setImageUri] = useState<string | null>(null);

  const router = useRouter();
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];

  const statusList = ["scheduled", "preparing", "ready", "done"];

  const [selectedStatus, setSelectedStatus] = useState<string>();

  const getDish = async () => {
    const data = await getMyDishById(id as string);
    if (data) {
      setDish(data);
      setImageUri(data.imgUrl as string);
      setSelectedStatus(data.status as string);
    }
  };

  useEffect(() => {
    console.log(id);
    getDish();
  }, [id]);

  if (!dish) {
    return (
      <ThemedView className=" flex-1 items-center justify-center">
        <ThemedLoader />
      </ThemedView>
    );
  }
  if (dish) {
    return (
      <ThemedView
        isSafeArea
        className={
          " flex-1 items-center justify-center " +
          (Platform.OS === "web" ? " mt-5" : "")
        }
      >
        <View className=" flex-1 w-[90%]">
          <View className=" absolute left-1 top-1">
            <ThemedButton onPress={() => router.back()} className=" self-start">
              <Ionicons color={color.text} name="arrow-back-circle" size={50} />
            </ThemedButton>
          </View>
          <Pressable
            onPress={() => setShowImage(true)}
            className={
              "w-64 h-64 rounded border  mr-2 overflow-hidden self-center active:opacity-50 " +
              " dark:border-background-200/20 dark:bg-background-50/5" +
              " border-background-300/20 bg-background-950/5"
            }
          >
            {imageUri ? (
              <View className="flex-1 ">
                <Image
                  source={{ uri: imageUri }}
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
              className=" absolute bottom-0 rounded-tl right-0 bg-secondary-300 items-center justify-center"
            >
              <Ionicons name="add" size={25} />
            </View>
          </Pressable>
          <ThemedText className=" text-lg" textColor="text">
            {dish.title}
          </ThemedText>
          <ThemedText
            textColor="text"
            className="  font-light text-sm opacity-75"
          >
            {new Date(dish.availableAt).toLocaleDateString("en-EN", {
              month: "long",
              day: "2-digit",
              weekday: "short",
              year: "numeric",
            })}
          </ThemedText>
          <View className="ml-5">
            <ThemedText className="font-light" textColor="text">
              {dish.description}
            </ThemedText>
            <View className=" flex-row gap-1 mt-1">
              {dish.tags &&
                dish.tags.map((tag) => {
                  const selected = tags.find((t) => t.slug === tag);

                  return (
                    <View className=" bg-secondary-300 px-1 rounded-full">
                      <ThemedText className="text-text-950 font-light">
                        {selected?.label[language]}
                      </ThemedText>
                    </View>
                  );
                })}
            </View>
            <ThemedText
              className="self-end text-lg pr-5"
              textColor="text"
            >{`${dish.availableServings}/${dish.servings}`}</ThemedText>
          </View>
          <View className=" z-10 justify-between items-center flex-row pt-2">
            <ThemedText
              className="font-semibold text-lg"
              textColor="text"
            >{`${dish.price.amount} ${dish.price.currency}`}</ThemedText>
            <View>
              <ThemedButton
                onPress={() => setStatusDropdown(!statusDropdown)}
                className={
                  " rounded p-1 w-[110px] items-center justify-center " +
                  (selectedStatus === "cancelled"
                    ? "bg-rose-500"
                    : selectedStatus === "ready" || selectedStatus === "done"
                      ? " bg-emerald-500"
                      : " bg-accent-300")
                }
              >
                <ThemedText className=" font-light text-text-950">
                  {selectedStatus}
                </ThemedText>
              </ThemedButton>
              <View id="Status" className="">
                {statusDropdown && (
                  <View
                    style={{ backgroundColor: color.background }}
                    className=" flex-1 absolute w-[110px] rounded overflow-hidden"
                  >
                    {statusList.map((status, index) => {
                      return (
                        <ThemedButton
                          disabled={status === selectedStatus}
                          onPress={() => {
                            setSelectedStatus(status);
                            setStatusDropdown(false);
                          }}
                          className={
                            " p-1  items-center justify-center " +
                            (status === selectedStatus
                              ? "bg-secondary-300"
                              : index % 2 === 0
                                ? "bg-primary-300/50"
                                : "bg-primary-300/25")
                          }
                        >
                          <ThemedText className=" font-thin" textColor="text">
                            {status}
                          </ThemedText>
                        </ThemedButton>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View id="Notifications" className="">
            <View className=" flex-row bg-secondary-300 items-center p-1 mt-1 rounded-t ">
              <Ionicons
                color={colors.dark.text}
                name="notifications-circle"
                size={25}
              />
              <ThemedText className="text-text-50"> Notifications</ThemedText>
            </View>
            <View className="min-h-14 rounded-b bg-background-950/10 dark:bg-background-50/10 items-center justify-center">
              <View className=" my-3 items-center opacity-50">
                <Ionicons
                  size={40}
                  color={color.text}
                  name="information-circle-outline"
                />
                <ThemedText className="font-thin ml-2" textColor="text">
                  Don't found any notification!
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
        <View id="MainButtons" className="w-full flex-row justify-between mb-5">
          <View className="flex-1 items-center justify-center">
            <ThemedButton
              onPress={() => {
                if (imageUri && imageUri !== dish.imgUrl) {
                  updateDishImage(dish._id, imageUri);
                }
                if (dish.status !== selectedStatus && selectedStatus) {
                  updateDishStatus(dish._id, selectedStatus);
                }
              }}
              className=" p-1 px-4 rounded bg-emerald-500"
            >
              <Text className=" text-lg text-text-50">Update Dish</Text>
            </ThemedButton>
          </View>
          <View className=" flex-1 items-center justify-center">
            <ThemedButton
              onPress={() => updateDishStatus(dish._id, "cancelled")}
              className=" p-1 px-4 rounded bg-rose-500"
            >
              <Text className=" text-lg text-text-50">Cancel Dish</Text>
            </ThemedButton>
          </View>
        </View>
        {showImage && (
          <ThemedEmptyModal
            visible={showImage}
            onClose={() => setShowImage(false)}
          >
            <View
              style={{ backgroundColor: color.background }}
              className="w-96 h-96 rounded"
            >
              <CustomImageUploader
                onAddImage={(image) => setImageUri(image)}
              ></CustomImageUploader>
            </View>
          </ThemedEmptyModal>
        )}
      </ThemedView>
    );
  }
};

export default DishDetail;
