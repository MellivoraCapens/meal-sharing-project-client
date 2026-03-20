import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, useColorScheme, View } from "react-native";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useUserLocation } from "../Hooks/useUserLocation";
// Themed Components
import ThemedTextInput from "./ThemedTextInput";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";
// Constants
import colors from "../constants/Color";
import { markerIcon } from "../constants/MarkerIcon";
import { darkTile, lightTile, markerTexture } from "../constants/MapStyles";

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

  const [userLocation, setUserLocation] = useState({
    latitude: savedLocation?.latitude || 0,
    longitude: savedLocation?.longitude || 0,
  });
  const [zoom, setZoom] = useState(13);
  const { location, errorMsg } = useUserLocation();
  const [autoCompleteLocations, setAutoCompleteLocations] = useState<
    Array<PhotonFeature>
  >([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const currentLocation = () => {
    if (location) {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const MapUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
      if (lat !== 0 && lng !== 0) {
        map.setView([lat, lng], zoom);
      }
    }, [lat, lng]);
    return null;
  };

  const LocationPicker = ({
    onLocationChange,
  }: {
    onLocationChange: (lat: number, lng: number) => void;
  }) => {
    useMapEvents({
      dragend: (e) => {
        const center = e.target.getCenter();
        onLocationChange(center.lat, center.lng);
        setUserLocation({ latitude: center.lat, longitude: center.lng });
      },
      zoomend: (e) => {
        setZoom(e.target.getZoom());
      },
    });
    return null;
  };

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

  useEffect(() => {
    currentLocation();
  }, [location]);

  useEffect(
    () => onLocationSelect([userLocation.longitude, userLocation.latitude]),
    [userLocation],
  );

  return (
    <View className="flex-1">
      <View className="mb-1">
        <ThemedTextInput
          onChange={(e) => {
            searchLocation(e.nativeEvent.text);
          }}
          placeholder="Location"
        />
      </View>
      {autoCompleteLocations.length > 0 && showAutoComplete && (
        <ScrollView
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
      <View className="flex-1 rounded overflow-hidden">
        <MapContainer
          zoom={zoom}
          center={[userLocation.latitude, userLocation.longitude]}
          style={{ flex: 1, height: "100%", width: "100%" }}
        >
          <TileLayer
            url={colorScheme === "dark" ? darkTile : lightTile}
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapUpdater
            lat={userLocation.latitude}
            lng={userLocation.longitude}
          />
          <LocationPicker
            onLocationChange={(lat, lng) =>
              setUserLocation({ latitude: lat, longitude: lng })
            }
          />
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -12 }, { translateY: -41 }],
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <Image
              source={{
                uri: markerTexture,
              }}
              style={{ width: 25, height: 41 }}
            />
          </View>
          <View className="z-[10000] absolute bottom-1 left-1">
            {location && (
              <ThemedButton
                onPress={() => currentLocation()}
                className="bg-secondary-300 p-1 rounded"
              >
                <ThemedText>Current Location</ThemedText>
              </ThemedButton>
            )}
          </View>
        </MapContainer>
      </View>
    </View>
  );
};

export default CustomMap;
