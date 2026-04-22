import { useEffect } from "react";
import ThemedText from "../../../../Components/UI/ThemedText";
import ThemedView from "../../../../Components/UI/ThemedView";
import { useDish } from "../../../../Hooks/useDish";
import { Pressable, ScrollView } from "react-native";
import DishCard from "../../../../Components/DishCard";

const Home = () => {
  const { myActiveDishes, getMyActiveDishes } = useDish();

  useEffect(() => {
    getMyActiveDishes();
  }, []);
  return (
    <ThemedView hasTabBar className=" flex-1 items-center">
      <ScrollView showsVerticalScrollIndicator={false} className=" w-[90%]">
        <Pressable className=" cursor-default">
          {myActiveDishes &&
            myActiveDishes.map((dish) => {
              return <DishCard dish={dish} />;
            })}
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
};
export default Home;
