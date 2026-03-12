import { useContext } from "react";
import { TagContext } from "../Contexts/TagContext";

export const useTags = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
};
