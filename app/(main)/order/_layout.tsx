import { Stack, useRouter } from "expo-router";
import { Platform, Pressable, useColorScheme } from "react-native";
import colors from "../../../constants/Color";
import {
  CherryBombOne_400Regular,
  useFonts,
} from "@expo-google-fonts/cherry-bomb-one";
import ThemedLoader from "../../../Components/ThemedLoader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../Hooks/useAuth";

export default function cookLayout() {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const color = colors[colorScheme];
  const { logout } = useAuth();
  let [fontsLoaded] = useFonts({
    CherryBombOne_400Regular,
  });

  if (!fontsLoaded) {
    return <ThemedLoader />;
  }

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="home"
        options={{
          headerLeft: () => {
            return (
              <Pressable
                className={
                  (Platform.OS === "web" ? "ml-2 " : "") + " active:opacity-25"
                }
                onPress={() => router.navigate("/main")}
              >
                <Ionicons
                  name="arrow-back"
                  size={25}
                  style={{ color: colors.light.text }}
                />
              </Pressable>
            );
          },
          headerRight: () => {
            return (
              <Pressable
                className={
                  (Platform.OS === "web" ? "mr-2 " : "") + " active:opacity-25"
                }
                onPress={() => logout()}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  style={{ color: colors.light.text }}
                />
              </Pressable>
            );
          },
          headerTitle: "Grapes",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "CherryBombOne_400Regular",
            fontSize: 30,
          },
          headerTintColor: colors.light.text,
          headerStyle: { backgroundColor: color.primary },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
