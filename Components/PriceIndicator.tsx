import React, { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import ThemedText from "./UI/ThemedText";
import ThemedButton from "./UI/ThemedButton";
import * as Localization from "expo-localization";

interface PriceIndicatorProps {
  onChange: (amount: string | null, currency: string) => void;
  lastAmount: string | null;
}

const currencies = ["USD", "EUR", "GBP", "TRY"];

const PriceIndicator: React.FC<PriceIndicatorProps> = ({
  lastAmount,
  onChange,
}) => {
  const currency = Localization.getLocales()[0].currencyCode ?? "TRY";
  const [amount, setAmount] = useState<string | null>(null);
  const [cents, setCents] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<
    "amount" | "cents" | null
  >(null);

  const [currencyOptions, setCurrencyOptions] = useState<boolean>(false);

  const numericRegex = /^[0-9]*$/;

  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const amountRef = useRef<TextInput>(null);
  const centsRef = useRef<TextInput>(null);

  useEffect(() => {
    if (amount !== null) {
      setPrice(`${amount}.${cents || "00"}`);
    }
  }, [amount, cents, currency]);

  useEffect(() => {
    if (lastAmount) {
      const splitedPrice = lastAmount.split(".");
      setAmount(splitedPrice[0]);
      setCents(splitedPrice[1]);
    }
  }, []);

  useEffect(() => {
    if (price) {
      onChange(price, selectedCurrency);
    }

    if (!price) {
      onChange("", selectedCurrency);
    }
  }, [price]);

  return (
    <View>
      <View className=" flex-row flex-wrap items-center ">
        <ThemedText textColor="text" className="mr-1">
          {" "}
          Price:
        </ThemedText>
        <ThemedButton
          onPress={() => {
            setAmount(null);
            setPrice(null);
            amountRef.current?.focus();
          }}
          className={
            "border p-1 rounded border-white/20 " +
            (selectedIndicator === "amount"
              ? "bg-secondary-300"
              : "bg-background-200/30")
          }
        >
          <ThemedText textColor="text">{amount || "___"}</ThemedText>
        </ThemedButton>
        <TextInput
          ref={amountRef}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          onFocus={() => setSelectedIndicator("amount")}
          onBlur={() => setSelectedIndicator(null)}
          onChange={(e) => {
            if (
              e.nativeEvent.text.length <= 4 &&
              numericRegex.test(e.nativeEvent.text)
            ) {
              setAmount(e.nativeEvent.text);
            }
            if (+e.nativeEvent.text === 0) {
              setAmount(null);
              setPrice("");
            }
          }}
          keyboardType="decimal-pad"
          value={amount || ""}
          className="outline-none border rounded border-white/20 bg-background-200/30"
        />
        <ThemedText className=" px-1" textColor="text">
          .
        </ThemedText>
        <ThemedButton
          onPress={() => {
            setCents(null);
            centsRef.current?.focus();
          }}
          className={
            "border p-1 rounded border-white/20 " +
            (selectedIndicator === "cents"
              ? "bg-secondary-300"
              : "bg-background-200/30")
          }
        >
          <ThemedText textColor="text">{cents || "00"}</ThemedText>
        </ThemedButton>
        <TextInput
          onFocus={() => setSelectedIndicator("cents")}
          onBlur={() => setSelectedIndicator(null)}
          ref={centsRef}
          onChange={(e) => {
            if (
              e.nativeEvent.text.length <= 2 &&
              numericRegex.test(e.nativeEvent.text)
            ) {
              setCents(e.nativeEvent.text);
            }
          }}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          keyboardType="decimal-pad"
          value={cents || ""}
        />
        <View className=" flex-row items-center justify-center">
          {currencies.map((currency) => {
            if (selectedCurrency === currency || currencyOptions) {
              return (
                <ThemedButton
                  onPress={() => {
                    setCurrencyOptions(!currencyOptions);
                    setSelectedCurrency(currency);
                  }}
                  className={
                    "p-1 mx-1 border  rounded " +
                    (currencyOptions ? " border-white/20 " : "") +
                    (currency === selectedCurrency && currencyOptions
                      ? " bg-secondary-300"
                      : "")
                  }
                >
                  <ThemedText className=" text-sm" textColor="text">
                    {currency}
                  </ThemedText>
                </ThemedButton>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

export default PriceIndicator;
