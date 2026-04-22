import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import colors from "../../../constants/Color";

export default function cookLayout() {
  const colorShceme = useColorScheme() || "light";
  const color = colors[colorShceme];

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "Grapes",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "CherryBombOne_400Regular",
          fontSize: 24,
        },
        headerTintColor: color.textSecondary,
        headerStyle: { backgroundColor: color.primary },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
