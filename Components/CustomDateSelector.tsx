import { ScrollView, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedButton from "./ThemedButton";
import { useState } from "react";

interface CustomDateSelectorProps {
  length: number;
  onDateSelect: (date: Date) => void;
}

const CustomDateSelector: React.FC<CustomDateSelectorProps> = ({
  length,
  onDateSelect,
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dates = Array.from({ length }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return new Date(d);
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row overflow-scroll mt-1"
    >
      {dates.map((date, i) => {
        const isSelected = selectedDate.getDay() === date.getDay();
        return (
          <ThemedButton
            key={i}
            onPress={() => {
              setSelectedDate(date);
              onDateSelect(date);
            }}
            className={
              (isSelected ? "bg-secondary-300 " : "bg-background-200/25 ") +
              " mx-[1px] p-1 rounded"
            }
          >
            <ThemedText
              textColor={isSelected ? "textSecondary" : "text"}
              className="font-light"
            >
              {date.toLocaleDateString("en-EN", {
                month: "long",
                day: "2-digit",
                weekday: "short",
              })}
            </ThemedText>
          </ThemedButton>
        );
      })}
    </ScrollView>
  );
};

export default CustomDateSelector;
