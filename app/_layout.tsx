import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { AuthProvider } from "../Contexts/AuthContext";
import {
  CherryBombOne_400Regular,
  useFonts,
} from "@expo-google-fonts/cherry-bomb-one";
// Components
import ThemedLoader from "../Components/ThemedLoader";
import { TagProvider } from "../Contexts/TagContext";

if (Platform.OS === "web") {
  require("../global.web.css");
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "CherryBombOne-Regular": CherryBombOne_400Regular,
  });

  if (!fontsLoaded) {
    return <ThemedLoader />;
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <TagProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </TagProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
