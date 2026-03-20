import React, { useEffect, useState } from "react";
import { Platform, useColorScheme, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Hooks
import { useTags } from "../Hooks/useTags";
import { useAuth } from "../Hooks/useAuth";
// Constants
import colors from "../constants/Color";
// Themed Components
import ThemedButton from "./ThemedButton";
import ThemedNumberInput from "./ThemedNumberInput";
import ThemedTextInput from "./ThemedTextInput";
import ThemedText from "./ThemedText";
import CustomDateSelector from "./CustomDateSelector";
import CustomMap from "./CustomMap";
import { useDish } from "../Hooks/useDish";

const categories = ["cuisine", "dietary", "dishType", "flavor", "other"];

const CreateDish = () => {
  const { createDish } = useDish();
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const { user } = useAuth();
  const { categorizedTags, getAllTags, loading } = useTags();

  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];

  const [showTags, setShowTags] = useState(false);
  const [categorizedObject, setCategorizedObject] = useState({
    ...categorizedTags,
  });

  const [dishForm, setDishForm] = useState({
    title: "",
    description: "",
    cookId: user?._id,
    tags: [],
    servings: 1,
    availableAt: new Date(),
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  });

  const validateDishForm = () => {
    if (!dishForm.title.trim()) return false;
    if (!dishForm.description) return false;
    if (!dishForm.cookId) return false;
    if (dishForm.servings < 1) return false;
    if (!dishForm.availableAt) return false;
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

  return (
    <View className="flex-1 w-[90%]">
      <ThemedText textColor="text" className=" text-xl font-bold my-2">
        Create a New Dish
      </ThemedText>
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
      <CustomMap
        savedLocation={{ latitude: 0, longitude: 0 }}
        onLocationSelect={(coordinates) =>
          setDishForm((prev) => ({
            ...prev,
            location: { ...prev.location, coordinates },
          }))
        }
      />
      <View className="bottom-0 items-end">
        <ThemedButton
          disabled={!validateDishForm()}
          className={
            " bg-secondary-300 py-2 px-10 rounded items-center " +
            (Platform.OS === "ios" ? "mt-10" : "mt-1")
          }
          onPress={() => {
            createDish(dishForm);
          }}
        >
          <ThemedText
            className={" text-lg " + (Platform.OS === "ios" && " font-bold")}
          >
            Submit
          </ThemedText>
        </ThemedButton>
      </View>
    </View>
  );
};

export default CreateDish;
