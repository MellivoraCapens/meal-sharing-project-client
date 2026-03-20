import { Stack } from "expo-router";
import UserOnly from "../../Components/Auth/UserOnly";
import { useColorScheme } from "react-native";
import colors from "../../constants/Color";
import { DishProvider } from "../../Contexts/DishContext";

export default function MainLayout() {
  const colorSheme = useColorScheme() || "light";
  const color = colors[colorSheme];

  return (
    <UserOnly>
      <DishProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            title: "Main",
            headerTintColor: color.text,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: color.secondary,
            },
            headerShadowVisible: false,
          }}
        ></Stack>
      </DishProvider>
    </UserOnly>
  );
}
