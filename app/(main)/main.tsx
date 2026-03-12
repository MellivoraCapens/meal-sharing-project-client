import { Pressable, useColorScheme } from "react-native";
import ThemedText from "../../Components/ThemedText";
import ThemedView from "../../Components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../constants/Color";
import { useAuth } from "../../Hooks/useAuth";
import { useRouter } from "expo-router";

const Main = () => {
  const colorSheme = useColorScheme() || "light";
  const color = colors[colorSheme];
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ThemedView isSafeArea className="flex-1 items-center justify-center">
      <ThemedText textColor="text" size="2xl" className="mb-10 font-extralight">
        {`Welcome to `}
        <ThemedText textColor="primary" size="2xl" className="font-normal">
          Grapes
        </ThemedText>
        {`, ${user?.nickname}!`}
      </ThemedText>
      <Pressable
        onPress={() => router.navigate("/(main)/cook/home")}
        className="dark:bg-background-900 bg-background-100  border-primary-300 rounded-xl border-4 w-40 h-40 items-center justify-center  active:opacity-50"
      >
        <Ionicons
          name="flame-outline"
          color={color.primary}
          size={60}
        ></Ionicons>
        <ThemedText
          textColor="primary"
          size="3xl"
          className=" font-cherry-regular"
        >
          Cook!
        </ThemedText>
      </Pressable>
      <Pressable
        onPress={() => router.navigate("/(main)/order/home")}
        className=" dark:bg-background-900 bg-background-100 border-primary-300 rounded-xl border-4 w-40 h-40 items-center justify-center  mt-5 active:opacity-50"
      >
        <Ionicons
          name="bag-handle-outline"
          color={color.primary}
          size={60}
        ></Ionicons>
        <ThemedText
          textColor="primary"
          size="3xl"
          className="font-cherry-regular"
        >
          Order!
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

export default Main;
