import React from "react";
import { Image, useColorScheme, View } from "react-native";
import ThemedText from "./UI/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../constants/Color";
import ThemedButton from "./UI/ThemedButton";
import { useRouter } from "expo-router";

interface DishCardProps {
  dish: DishType;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const color = colors[colorScheme];

  return (
    <View
      className={
        " border rounded p-2 my-1 " +
        " dark:border-background-200/20 dark:bg-background-50/5" +
        " border-background-300/20 bg-background-950/5"
      }
    >
      <View className=" flex-row justify-between items-center">
        <ThemedButton
          onPress={() => router.navigate(`/cook/${dish._id}`)}
          className=" flex-row items-center"
        >
          <View
            className={
              "w-14 h-14 rounded border  mr-2 overflow-hidden " +
              " dark:border-background-200/20 dark:bg-background-50/5" +
              " border-background-300/20 bg-background-950/5"
            }
          >
            {dish.imgUrl ? (
              <Image
                source={{ uri: dish.imgUrl }}
                className="h-full w-full"
                resizeMode="cover"
              />
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
          </View>
          <View>
            <ThemedText className="text-lg" textColor="text">
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
          </View>
        </ThemedButton>
        <ThemedButton
          onPress={() => console.log("pressed")}
          className=" self-start"
        >
          <Ionicons
            style={{ alignSelf: "flex-start" }}
            name="ellipsis-vertical"
            color={color.text}
            size={20}
          />
        </ThemedButton>
      </View>

      <View className=" mt-1">
        <ThemedButton
          onPress={() => console.log("pressed")}
          className=" flex-row items-center rounded bg-secondary-300"
        >
          <Ionicons
            style={{ marginLeft: 5 }}
            name="notifications-circle"
            size={25}
            color={colors.dark.background}
          />
          <ThemedText className=" ml-2 text-sm text-background-950">
            4 Notification!
          </ThemedText>
        </ThemedButton>

        <ThemedText
          numberOfLines={2}
          ellipsizeMode="tail"
          textColor="text"
          className=" font-light ml-5"
        >
          {dish.description.length < 100 ? dish.description : dish.description}
        </ThemedText>

        <ThemedText className="self-end" textColor="text">
          {dish.availableServings} / {dish.servings}
        </ThemedText>
      </View>

      <View className=" flex-row mt-2 justify-between items-center">
        <ThemedText textColor="text">
          {dish.price.amount} {dish.price.currency}
        </ThemedText>
        <ThemedButton
          onPress={() => console.log("pressed")}
          className={
            " rounded p-1 " +
            (dish.status === "cancelled" || dish.status === "expired"
              ? "bg-rose-500"
              : dish.status === "ready" || dish.status === "done"
                ? " bg-emerald-500"
                : " bg-accent-300")
          }
        >
          <ThemedText className=" font-light text-text-950">
            {dish.status}
          </ThemedText>
        </ThemedButton>
      </View>
    </View>
  );
};

export default DishCard;
