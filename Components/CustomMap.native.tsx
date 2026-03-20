import { useEffect, useState } from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
// Constants
import { darkMapStyle } from "../constants/MapStyles";
import colors from "../constants/Color";
// Hooks
import { useUserLocation } from "../Hooks/useUserLocation";
// Themed Components
import ThemedTextInput from "./ThemedTextInput";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomMapProps {
  savedLocation?: {
    latitude: number;
    longitude: number;
  };
  onLocationSelect: (coordinates: [number, number]) => void;
}

const CustomMap: React.FC<CustomMapProps> = ({
  savedLocation,
  onLocationSelect,
}) => {
  const colorScheme = useColorScheme() || "light";
  const color = colors[colorScheme];

  const { location, errorMsg } = useUserLocation();

  const [userLocation, setUserLocation] = useState({
    latitude: savedLocation?.latitude || 0,
    longitude: savedLocation?.longitude || 0,
  });
  const [mapZoom, setMapZoom] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [autoCompleteLocations, setAutoCompleteLocations] = useState<
    Array<PhotonFeature>
  >([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const searchLocation = async (text: string) => {
    if (text.length < 3) {
      setShowAutoComplete(false);
      return setAutoCompleteLocations([]);
    }
    const URL = process.env.EXPO_PUBLIC_PHOTON_API;

    const res = await fetch(URL + `/?q=${text}&limit=7`);
    const data = await res.json();
    if (data) {
      setAutoCompleteLocations(data.features);
      setShowAutoComplete(true);
    }
  };
  const currentLocation = () => {
    if (location) {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  useEffect(() => {
    if (location) {
      setUserLocation({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
    }
  }, [location]);

  useEffect(
    () => onLocationSelect([userLocation.longitude, userLocation.latitude]),
    [userLocation],
  );

  return (
    <View className="flex-1">
      <ThemedTextInput
        onChange={(e) => searchLocation(e.nativeEvent.text)}
        placeholder="Location"
        className=" mb-1"
      />
      {autoCompleteLocations.length > 0 && showAutoComplete && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          className="absolute z-[100000] w-[100%] rounded top-9"
          style={{ backgroundColor: color.background, maxHeight: 192 }}
        >
          {autoCompleteLocations.map((loc, index) => {
            const properties = loc.properties;
            const coordinates = loc.geometry.coordinates;
            return (
              <ThemedButton
                onPress={() => {
                  setUserLocation({
                    latitude: coordinates[1],
                    longitude: coordinates[0],
                  });
                  setShowAutoComplete(false);
                  setAutoCompleteLocations([]);
                }}
                key={index}
                className="bg-secondary-300 my-[0.5px] py-1"
              >
                <ThemedText className=" text-text-950">
                  {`${properties.country}`}
                  {properties.state && `, ${properties.state}`}
                  {properties.district && `, ${properties.district}`}
                  {properties.name !== undefined && `, ${properties.name}`}
                  {properties.street && `, ${properties.street}`}
                  {properties.postcode && `, ${properties.postcode}`}
                </ThemedText>
              </ThemedButton>
            );
          })}
        </ScrollView>
      )}
      <View className="w-[100%] h-[100%] rounded overflow-hidden">
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center ">
          <Ionicons
            name="location-sharp"
            size={45}
            color="#f96c71"
            style={{ marginBottom: 37, zIndex: 10000 }}
          />
        </View>
        <MapView
          customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
          provider="google"
          style={{ flex: 1 }}
          region={{
            latitude: userLocation.latitude || 41.0082,
            longitude: userLocation.longitude || 28.9784,
            latitudeDelta: mapZoom.latitudeDelta,
            longitudeDelta: mapZoom.longitudeDelta,
          }}
          onRegionChangeComplete={(region) => {
            setUserLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
            setMapZoom({
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }}
        />
        <View className="z-[10000] absolute top-1 right-1">
          {location && (
            <ThemedButton
              onPress={() => currentLocation()}
              className="bg-secondary-300 p-1 rounded"
            >
              <ThemedText>Current Location</ThemedText>
            </ThemedButton>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomMap;
