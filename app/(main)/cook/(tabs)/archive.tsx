import { useEffect, useRef, useState } from "react";
import ThemedButton from "../../../../Components/UI/ThemedButton";
import ThemedView from "../../../../Components/UI/ThemedView";
import { useDish } from "../../../../Hooks/useDish";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import DishCard from "../../../../Components/DishCard";
import ThemedLoader from "../../../../Components/UI/ThemedLoader";

const Archive = () => {
  const { getMyAllDishes, dishLoading } = useDish();
  const [dishes, setDishes] = useState<Array<DishType>>([]);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);
  const [page, setPage] = useState(1);

  const scrollHandler = async () => {
    if (!isFetching.current && hasMore) {
      isFetching.current = true;
      const data = await getMyAllDishes(page);
      if (data.length < 10) {
        setHasMore(false);
      }
      setPage(page + 1);
      setDishes((prev) => [...prev, ...data]);
    }
    isFetching.current = false;
    console.log(dishes.length);
  };

  useEffect(() => {
    scrollHandler();
  }, []);

  return (
    <ThemedView hasTabBar className=" flex-1 items-center justify-center ">
      <View className="flex-1 w-[90%]">
        <FlatList
          data={dishes}
          renderItem={({ item }) => (
            <Pressable className=" cursor-default">
              <DishCard dish={item} />
            </Pressable>
          )}
          onEndReached={scrollHandler}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            dishLoading ? (
              <View className="py-4">
                <ThemedLoader />
              </View>
            ) : null
          }
        />
      </View>
    </ThemedView>
  );
};

export default Archive;
