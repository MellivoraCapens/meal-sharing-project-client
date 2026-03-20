import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

interface ITagContext {
  tags: ITag[];
  categorizedTags: CategorizedTags | undefined;
  loading: boolean;
  getAllTags: () => Promise<void>;
}
interface TagProviderProps {
  children: React.ReactNode;
}

type CategorizedTags = {
  [key: string]: {
    category: string;
    title: string;
    tags: ITag[];
  };
};

export const TagContext = createContext<ITagContext | undefined>(undefined);

export const TagProvider: React.FC<TagProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const [categorizedTags, setCategorizedTags] = useState<
    CategorizedTags | undefined
  >();

  const getAllTags = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);

    const URL = process.env.EXPO_PUBLIC_API_URL;

    try {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(URL + "/tag/active", {
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
      setTags(data.tags);
      setCategorizedTags(data.data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <TagContext.Provider value={{ tags, loading, getAllTags, categorizedTags }}>
      {children}
    </TagContext.Provider>
  );
};
