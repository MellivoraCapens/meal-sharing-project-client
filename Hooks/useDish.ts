import { useContext } from "react";
import { DishContext } from "../Contexts/DishContext";

export const useDish = () => {
  const context = useContext(DishContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
