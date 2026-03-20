import { ComponentType } from "react";

interface CustomMapProps {
  savedLocation?: {
    latitude: number;
    longitude: number;
  };
  onLocationSelect: (coordinates: [number, number]) => void;
}

declare module "./CustomMap" {
  const CustomMap: ComponentType<CustomMapProps>;
}
export default CustomMap;
