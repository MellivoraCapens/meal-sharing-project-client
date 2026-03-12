import { ActivityIndicator, useColorScheme } from "react-native";
import ThemedView from "./ThemedView";
import colors from "../constants/Color";

const ThemedLoader = () => {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme].primary;

  return (
    <ThemedView className=" flex-1 justify-center items-center">
      <ActivityIndicator color={color} size={"large"} />
    </ThemedView>
  );
};
export default ThemedLoader;
