import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMediaLibraryPermissionsAsync } from "expo-image-picker";
import React, { createContext, useState } from "react";
import { Platform } from "react-native";

interface IDishContext {
  createDish: (body: any, imageUri: string | null) => Promise<void>;
  getMyActiveDishes: () => Promise<void>;
  getMyDishById: (id: string) => Promise<DishType | null>;
  updateDishImage: (id: string, imageUri: string) => Promise<void>;
  updateDishStatus: (id: string, status: string) => Promise<void>;
  getMyAllDishes: (page: number) => Promise<Array<DishType>>;
  myActiveDishes: Array<DishType> | null;
  dishLoading: boolean;
}

export const DishContext = createContext<IDishContext | undefined>(undefined);

interface DishProviderProps {
  children: React.ReactNode;
}

export const DishProvider: React.FC<DishProviderProps> = ({ children }) => {
  const URL = process.env.EXPO_PUBLIC_API_URL;
  const [dishLoading, setDishLoading] = useState<boolean>(false);
  const [myActiveDishes, setMyActiveDishes] = useState<null | Array<DishType>>(
    null,
  );

  const createDish = async (body: IDishForm, imageUri: string | null) => {
    setDishLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${URL}/dish/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      });
      const text = await response.text();

      const data = await JSON.parse(text);

      if (!data.success) {
        throw new Error(data.error);
      }

      let dish = data.data;

      if (imageUri) {
        const formData = new FormData();

        if (Platform.OS === "web") {
          const res = await fetch(imageUri);
          const blob = await res.blob();
          formData.append("dishImage", blob, "dish.webp");
        } else {
          formData.append("dishImage", {
            uri: imageUri,
            name: "dish.webp",
            type: "image/webp",
          } as any);
        }

        const imageResponse = await fetch(
          `${URL}/dish/image/${data.data._id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: token,
            },
          },
        );

        const imageText = await imageResponse.text();
        const imageData = await JSON.parse(imageText);

        if (imageData.success) {
          dish = imageData.data;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      getMyActiveDishes();
      setDishLoading(false);
    }
  };

  const getMyActiveDishes = async () => {
    setDishLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${URL}/dish/my-active`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const text = await response.text();

      const data = await JSON.parse(text);
      if (!data.success) {
        throw new Error(data.error);
      }

      setMyActiveDishes(data.data);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setDishLoading(false);
    }
  };

  const getMyDishById = async (id: string) => {
    setDishLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${URL}/dish/my/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const text = await response.text();
      const data = await JSON.parse(text);

      if (!data.success) {
        throw new Error(data.error);
      }
      console.log(data);

      return data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setDishLoading(false);
    }
  };

  const updateDishImage = async (id: string, imageUri: string) => {
    setDishLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const formData = new FormData();

      if (Platform.OS === "web") {
        const res = await fetch(imageUri);
        const blob = await res.blob();
        formData.append("dishImage", blob, "dish.webp");
      } else {
        formData.append("dishImage", {
          uri: imageUri,
          name: "dish.webp",
          type: "image/webp",
        } as any);
      }

      const response = await fetch(`${URL}/dish/image/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      const text = await response.text();
      const data = await JSON.parse(text);

      if (!data.success) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      getMyActiveDishes();
      setDishLoading(false);
    }
  };

  const updateDishStatus = async (id: string, status: string) => {
    setDishLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const body = { status };

      const response = await fetch(`${URL}/dish/status/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      });

      const text = await response.text();
      const data = await JSON.parse(text);

      if (!data.success) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      getMyActiveDishes();
      setDishLoading(false);
    }
  };

  const getMyAllDishes = async (page: number) => {
    setDishLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) throw new Error("No token found");

      const response = await fetch(`${URL}/dish/get-all/${page}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const text = await response.text();
      const data = await JSON.parse(text);

      return data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setDishLoading(false);
    }
  };

  return (
    <DishContext.Provider
      value={{
        dishLoading,
        createDish,
        getMyActiveDishes,
        getMyDishById,
        updateDishImage,
        updateDishStatus,
        getMyAllDishes,
        myActiveDishes,
      }}
    >
      {children}
    </DishContext.Provider>
  );
};
