import {
  Keyboard,
  Platform,
  Pressable,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import colors from "../constants/Color";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface ThemedViewProps {
  children?: React.ReactNode;
  className?: string;
  isSafeArea?: boolean;
  hasTabBar?: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  className,
  isSafeArea,
  hasTabBar,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor = colors[colorScheme].background;
  const { width } = useWindowDimensions();
  const webWide = width > 767 ? Platform.OS === "web" : false;

  const insets = useSafeAreaInsets();

  const bottomPadding = Platform.OS === "ios" ? 270 + insets.bottom : 65;

  const HTML = (
    <Pressable
      onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
      className={"flex-1 cursor-default " + (webWide && " w-3/4 self-center ")}
    >
      <View className={"" + (className || "")}>{children}</View>
    </Pressable>
  );

  if (isSafeArea) {
    return (
      <SafeAreaView style={{ backgroundColor }} className="flex-1">
        {HTML}
      </SafeAreaView>
    );
  }

  if (hasTabBar) {
    return (
      <SafeAreaView
        edges={["left", "right"]}
        style={{ backgroundColor }}
        className="flex-1"
      >
        <View style={{ paddingBottom: bottomPadding }} className="flex-1">
          {HTML}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ backgroundColor }} className="flex-1">
      {HTML}
    </View>
  );
};

export default ThemedView;
