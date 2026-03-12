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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../../../Components/CustomTabBar";
import Home from "./home";
import Archive from "./archive";
import Create from "./create";
import Notification from "./notification";

export default function cookLayout() {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];
  const router = useRouter();
  const { logout } = useAuth();
  const Tab = createBottomTabNavigator();

  let [fontsLoaded] = useFonts({
    CherryBombOne_400Regular,
  });

  if (!fontsLoaded) {
    return <ThemedLoader />;
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
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
                style={{ color: color.textSecondary }}
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
                style={{ color: color.textSecondary }}
              />
            </Pressable>
          );
        },
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
      <Tab.Screen
        component={Create}
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              color={color.textSecondary}
              name={focused ? "create" : "create-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Home}
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              color={color.textSecondary}
              name={focused ? "home" : "home-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Archive}
        name="archive"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              color={color.textSecondary}
              name={focused ? "list" : "list-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Notification}
        name="notification"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              color={color.textSecondary}
              name={focused ? "notifications" : "notifications-outline"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
