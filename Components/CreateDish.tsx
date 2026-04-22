import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Hooks
import { useTags } from "../Hooks/useTags";
import { useAuth } from "../Hooks/useAuth";
import { useDish } from "../Hooks/useDish";
import { useUserLocation } from "../Hooks/useUserLocation";
// Constants
import colors from "../constants/Color";
// Themed Components
import ThemedButton from "./UI/ThemedButton";
import ThemedNumberInput from "./UI/ThemedNumberInput";
import ThemedTextInput from "./UI/ThemedTextInput";
import ThemedText from "./UI/ThemedText";
import ThemedModal from "./UI/ThemedModal";
// Components
import CustomDateSelector from "./CustomDateSelector";
import CustomMap from "./CustomMap";
import PriceIndicator from "./PriceIndicator";
import CustomImageUploader from "./CustomImageUploader";
import ThemedLoader from "./UI/ThemedLoader";

const categories = ["cuisine", "dietary", "dishType", "flavor", "other"];

const CreateDish = () => {
  const { createDish, dishLoading } = useDish();
  const { user } = useAuth();
  const { categorizedTags, getAllTags, loading } = useTags();
  const { location, errorMsg } = useUserLocation();
  const colorScheme = useColorScheme() || "light";

  const color = colors[colorScheme];

  const [visibleOptions, setVisibleOptions] = useState<
    "info" | "image" | "location"
  >("info");
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [categorizedObject, setCategorizedObject] = useState({
    ...categorizedTags,
  });

  const [dishForm, setDishForm] = useState<IDishForm>({
    title: "",
    description: "",
    cookId: user?._id,
    tags: [],
    servings: 1,
    availableAt: new Date(),
    price: {
      amount: "",
      currency: "USD",
    },
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  });
  const [imageUri, setImageUri] = useState<string | null>(null);

  const validateDishForm = () => {
    if (!dishForm.title.trim()) return false;
    if (!dishForm.description) return false;
    if (!dishForm.cookId) return false;
    if (dishForm.servings < 1) return false;
    if (!dishForm.availableAt) return false;
    if (dishForm.price.amount === "") return false;
    if (
      dishForm.location.coordinates[0] === 0 &&
      dishForm.location.coordinates[1] === 0
    )
      return false;
    return true;
  };

  const formUpdater = (key: keyof typeof dishForm, value: any) => {
    setDishForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    formUpdater(
      "tags",
      selectedTags.map((tag) => tag.slug),
    );
  }, [selectedTags]);

  useEffect(() => {
    if (location) {
      setDishForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: [location.coords.longitude, location.coords.latitude],
        },
      }));
    }
  }, [location]);

  return (
    <View className={"flex-1 w-[90%]  h-full " + (modalVisible && " blur-sm")}>
      <ThemedButton
        id="info"
        onPress={() => setVisibleOptions("info")}
        className=" rounded bg-accent-300 p-1 mt-1 flex-row justify-between items-center"
      >
        <ThemedText className="text-text-950">Information</ThemedText>
        <Ionicons
          size={25}
          name={
            visibleOptions === "info"
              ? "chevron-up-outline"
              : "chevron-down-outline"
          }
        />
      </ThemedButton>
      <View className={visibleOptions === "info" ? "" : "h-0 invisible"}>
        <ThemedTextInput
          className=" my-1 "
          onChange={(e) => formUpdater("title", e.nativeEvent.text)}
          placeholder="Name"
        />
        <ThemedTextInput
          className={Platform.OS === "ios" ? " h-32 " : ""}
          multiline
          numberOfLines={4}
          onChange={(e) => formUpdater("description", e.nativeEvent.text)}
          placeholder="Description"
        />
        {selectedTags.length > 0 && (
          <View className="flex-row flex-wrap mt-1">
            {selectedTags.map((tag) => {
              return (
                <ThemedButton
                  className="bg-secondary-300 rounded-full mt-[1px] ml-[1px]"
                  onPress={() => {
                    let tagCategory: string;
                    for (const el in categorizedObject) {
                      if (categorizedObject[el].category === tag.category) {
                        tagCategory = el;
                      }
                    }

                    setSelectedTags((prev) =>
                      prev.filter((t) => t._id !== tag._id),
                    );
                    setCategorizedObject((prev) => ({
                      ...prev,
                      [tagCategory]: {
                        ...prev[tagCategory],
                        tags: [tag, ...prev[tagCategory].tags],
                      },
                    }));
                  }}
                >
                  <ThemedText
                    className="font-light px-1"
                    textColor="textSecondary"
                  >
                    {tag.label.en}
                  </ThemedText>
                </ThemedButton>
              );
            })}
          </View>
        )}
        <ThemedButton
          onPress={() => setShowTags(!showTags)}
          className={
            "flex-row items-center mt-1 justify-between rounded" +
            " bg-background-200/25"
          }
        >
          <ThemedText className="font-bold my-1 ml-1" textColor="text">
            Tags
          </ThemedText>
          <Ionicons
            className="mr-1"
            color={color.text}
            name={showTags ? "caret-up-outline" : "caret-down-outline"}
            size={15}
          />
        </ThemedButton>
        {showTags && categorizedObject && (
          <View>
            {categories.map((category) => {
              const title = categorizedObject[category].title;
              const tags = categorizedObject[category].tags;
              return (
                <View>
                  <ThemedText textColor="text" className=" font-light">
                    {title}
                  </ThemedText>
                  <View className=" flex-row flex-wrap">
                    {tags.map((tag) => {
                      return (
                        <ThemedButton
                          onPress={() => {
                            setCategorizedObject((prev) => ({
                              ...prev,
                              [category]: {
                                ...prev[category],
                                tags: prev[category].tags.filter(
                                  (t) => t._id !== tag._id,
                                ),
                              },
                            }));
                            setSelectedTags((prev) => [...prev, tag]);
                          }}
                          className="bg-secondary-300 rounded-full mt-[1px] ml-[1px]"
                        >
                          <ThemedText
                            className="font-light px-1"
                            textColor="textSecondary"
                          >
                            {tag.label.en}
                          </ThemedText>
                        </ThemedButton>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}
        <View>
          <CustomDateSelector
            length={7}
            onDateSelect={(date) => formUpdater("availableAt", date)}
          />
        </View>
        <ThemedNumberInput
          minNumber={1}
          maxNumber={10}
          textColor="text"
          title="Servings"
          defaultNumber={1}
          onNumberSelect={(number) => formUpdater("servings", number)}
        />
        <PriceIndicator
          lastAmount={dishForm.price.amount}
          onChange={(amount, currency) => {
            setDishForm((prev) => ({
              ...prev,
              price: { amount, currency },
            }));
          }}
        />
      </View>
      <ThemedButton
        id="image"
        onPress={() => setVisibleOptions("image")}
        className=" mt-1 rounded p-1 bg-accent-300 flex-row items-center justify-between"
      >
        <ThemedText className="text-text-900">Image</ThemedText>
        <Ionicons
          size={25}
          name={
            visibleOptions === "image"
              ? "chevron-up-outline"
              : "chevron-down-outline"
          }
        />
      </ThemedButton>
      <View
        className={
          "items-center" + (visibleOptions === "image" ? "" : " h-0 invisible")
        }
      >
        <CustomImageUploader onAddImage={(image) => setImageUri(image)} />
      </View>
      <ThemedButton
        id="location"
        onPress={() => setVisibleOptions("location")}
        className=" rounded bg-accent-300 p-1 my-1 flex-row justify-between items-center"
      >
        <ThemedText className="text-text-950">Location</ThemedText>
        <Ionicons
          size={25}
          name={
            visibleOptions === "location"
              ? "chevron-up-outline"
              : "chevron-down-outline"
          }
        />
      </ThemedButton>
      <View className="flex-1">
        {visibleOptions === "location" && (
          <CustomMap
            savedLocation={{
              latitude: dishForm.location.coordinates[1],
              longitude: dishForm.location.coordinates[0],
            }}
            onLocationSelect={(coordinates) =>
              setDishForm((prev) => ({
                ...prev,
                location: { ...prev.location, coordinates },
              }))
            }
          />
        )}
      </View>
      <View className=" items-end justify-end">
        <ThemedButton
          disabled={!validateDishForm()}
          className={
            " bg-secondary-300 py-2 px-10 rounded items-center " +
            (Platform.OS === "ios" ? "mt-10" : "mt-1")
          }
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ThemedText
            className={" text-lg " + (Platform.OS === "ios" && " font-bold")}
          >
            Submit Form
          </ThemedText>
        </ThemedButton>
      </View>
      <ThemedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Are you Sure?"
      >
        {dishLoading ? (
          <ThemedLoader />
        ) : (
          <View className=" items-center justify-center">
            <ThemedText textColor="text">
              Check every information before submit
            </ThemedText>
            <View className="flex-row items-center"></View>
            <ThemedButton
              onPress={() => {
                createDish(dishForm, imageUri);
                console.log(dishForm);
              }}
              className="bg-secondary-300 p-1 mt-4 rounded"
            >
              <ThemedText className=" text-text-50">Yes</ThemedText>
            </ThemedButton>
          </View>
        )}
      </ThemedModal>
    </View>
  );
};

export default CreateDish;
