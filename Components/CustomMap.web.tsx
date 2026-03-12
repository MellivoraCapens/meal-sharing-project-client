import { View } from "react-native";
import ThemedTextInput from "./ThemedTextInput";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CustomMap = () => {
  return (
    <View className="flex-1 rounded overflow-hidden">
      <MapContainer
        zoom={13}
        center={[0, 0]}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
    </View>
  );
};

export default CustomMap;
