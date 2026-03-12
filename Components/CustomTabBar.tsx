import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, useColorScheme, View } from "react-native";
import colors from "../constants/Color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ backgroundColor: color.primary }}
      className="items-center justify-between flex-row overflow-hidden absolute w-full bottom-0"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const handlePress = () => {
          navigation.navigate(route.name);
        };
        return (
          <Pressable
            style={{
              backgroundColor: isFocused
                ? colors.light.secondary
                : "transparent",
            }}
            className={
              (isFocused ? "" : "") + " items-center justify-center flex-1 p-4 "
            }
            onPress={() => handlePress()}
            key={route.key}
          >
            {options.tabBarIcon?.({
              focused: isFocused,
              color: color.textSecondary,
              size: 24,
            })}
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
