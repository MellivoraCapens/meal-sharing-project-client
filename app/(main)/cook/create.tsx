import CreateDish from "../../../Components/CreateDish";
import ThemedView from "../../../Components/ThemedView";

const Create = () => {
  return (
    <ThemedView hasTabBar className=" flex-1 items-center">
      <CreateDish />
    </ThemedView>
  );
};

export default Create;
