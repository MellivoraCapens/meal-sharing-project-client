import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedButton from "./ThemedButton";

interface ThemedNumberInputProps {
  defaultNumber: number;
  title: string;
  textColor: Colors;
  minNumber: number;
  maxNumber: number;
}

const ThemedNumberInput: React.FC<ThemedNumberInputProps> = ({
  defaultNumber,
  title,
  textColor,
  minNumber,
  maxNumber,
}) => {
  const [number, setNumber] = useState(defaultNumber);
  const [toggleDropDown, setToggleDropdown] = useState(false);
  const selectableNumbers = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_, i) => minNumber + i,
  );

  return (
    <View className="flex-row flex-wrap py-1 items-center justify-start">
      <ThemedText textColor={textColor}>{`${title}: `}</ThemedText>
      <ThemedButton
        className={"px-2 py-1 rounded-l" + " bg-background-200/25"}
        disabled={number <= minNumber}
        onPress={() => number > 1 && setNumber(number - 1)}
      >
        <ThemedText textColor={textColor}>-</ThemedText>
      </ThemedButton>
      <ThemedButton
        onPress={() => setToggleDropdown(!toggleDropDown)}
        className={"px-4 py-1 ml-[2px]" + " bg-background-200/25"}
      >
        <ThemedText textColor={textColor}>{number}</ThemedText>
      </ThemedButton>
      {toggleDropDown && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className={"flex-row max-w-64 ml-[2px]"}
        >
          {selectableNumbers.map((number) => {
            return (
              <ThemedButton
                onPress={() => {
                  setNumber(number);
                  setToggleDropdown(false);
                }}
                className={
                  " items-center px-4 py-1 mx-[1px] rounded-sm " +
                  " bg-background-200/25"
                }
              >
                <ThemedText textColor={textColor}>{number}</ThemedText>
              </ThemedButton>
            );
          })}
        </ScrollView>
      )}

      <ThemedButton
        className={"px-2 py-1 ml-[2px] rounded-r" + " bg-background-200/25"}
        disabled={number >= maxNumber}
        onPress={() => number < 11 && setNumber(number + 1)}
      >
        <ThemedText textColor={textColor}>+</ThemedText>
      </ThemedButton>
    </View>
  );
};

export default ThemedNumberInput;
