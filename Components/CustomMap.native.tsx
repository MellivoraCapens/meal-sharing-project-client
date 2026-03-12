import { Platform, View } from "react-native";
import ThemedTextInput from "./ThemedTextInput";
import MapView, { Marker } from "react-native-maps";

const CustomMap = () => {
  return (
    <View className="">
      <ThemedTextInput className=" mb-1"></ThemedTextInput>
      <View className="w-[100%] h-[100%] rounded overflow-hidden">
        <MapView
          provider="google"
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: 41.0082,
              longitude: 28.9784,
            }}
          />
        </MapView>
      </View>
    </View>
  );
};

export default CustomMap;
