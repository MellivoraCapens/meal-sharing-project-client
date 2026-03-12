import { Platform, useColorScheme, View } from "react-native";
import ThemedTextInput from "./ThemedTextInput";
import ThemedText from "./ThemedText";
import { useTags } from "../Hooks/useTags";
import { useState } from "react";
import ThemedButton from "./ThemedButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../constants/Color";
import ThemedNumberInput from "./ThemedNumberInput";
import CustomDateSelector from "./CustomDateSelector";
import CustomMap from "./CustomMap";

const CreateDish = () => {
  const { categorizedTags, getAllTags, loading } = useTags();
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];
  const today = new Date();
  const maximum = new Date();
  maximum.setDate(maximum.getDate() + 7);

  console.log(today, maximum);

  const [showTags, setShowTags] = useState(false);
  const [categorizedObject, setCategorizedObject] = useState({
    ...categorizedTags,
  });
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const categories = ["cuisine", "dietary", "dishType", "flavor", "other"];

  return (
    <View className="flex-1 w-[80%]">
      <ThemedText textColor="text" className=" text-xl font-bold my-2">
        Create a New Dish
      </ThemedText>
      <ThemedTextInput className=" my-1 " placeholder="Name" />
      <ThemedTextInput multiline numberOfLines={4} placeholder="Description" />
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
        <CustomDateSelector />
      </View>
      <ThemedNumberInput
        minNumber={1}
        maxNumber={10}
        textColor="text"
        title="Servings"
        defaultNumber={1}
      />
      <CustomMap />
      <View>
        <ThemedButton buttonColor="secondary">
          <ThemedText>Submit</ThemedText>
        </ThemedButton>
      </View>
    </View>
  );
};

export default CreateDish;
