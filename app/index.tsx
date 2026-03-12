import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

// Components
import ThemedView from "../Components/ThemedView";
import ThemedText from "../Components/ThemedText";

export default function Index() {
  const router = useRouter();

  return (
    <ThemedView isSafeArea className="flex-1 items-center justify-center">
      <View className=" flex justify-center items-center border-[6px] border-primary-300 h-52 w-52 rounded-3xl">
        <Ionicons
          name="flame-outline"
          className=" text-primary-300"
          color={"#816cf9"}
          size={100}
        />
        <Text className=" text-primary-300 text-3xl font-cherry-regular">
          {" "}
          G R A P E S{" "}
        </Text>
      </View>
      <Pressable className="mt-6" onPress={() => router.navigate("/login")}>
        <ThemedText
          size="lg"
          textColor="primary"
          className=" font-light  underline"
        >
          Log In / Sign In
        </ThemedText>
      </Pressable>
      <StatusBar style="auto" />
    </ThemedView>
  );
}
