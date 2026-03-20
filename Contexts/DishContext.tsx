import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface IDishContext {
  createDish: (body: any) => Promise<void>;
}

export const DishContext = createContext<IDishContext | undefined>(undefined);

interface DishProviderProps {
  children: React.ReactNode;
}

export const DishProvider: React.FC<DishProviderProps> = ({ children }) => {
  const URL = process.env.EXPO_PUBLIC_API_URL;

  const createDish = async (body: any) => {
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

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DishContext.Provider value={{ createDish }}>
      {children}
    </DishContext.Provider>
  );
};
