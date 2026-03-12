import { View } from "react-native";
// Hooks
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
// Components
import ThemedButton from "../../Components/ThemedButton";
import ThemedText from "../../Components/ThemedText";
import ThemedTextInput from "../../Components/ThemedTextInput";
import ThemedView from "../../Components/ThemedView";

const SignUp = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<ISignUpUserForm>({
    fullname: "",
    nickname: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const validateForm =
    form.fullname.length < 3 ||
    form.nickname.length < 3 ||
    !emailRegex.test(form.email) ||
    form.password.length <= 12;

  const handleChange = (field: keyof ISignUpUserForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ThemedView isSafeArea className="flex-1 items-center justify-center">
      <ThemedText textColor="text" size="xl">
        Sign Up
      </ThemedText>
      <View className=" mt-5 w-[70%] max-w-96 items-center justify-center">
        <ThemedTextInput
          value={form.fullname}
          onChange={(e) => handleChange("fullname", e.nativeEvent.text)}
          className=" w-full"
          placeholder="Full Name"
        />
        <ThemedTextInput
          value={form.nickname}
          onChange={(e) => handleChange("nickname", e.nativeEvent.text)}
          className=" mt-1 w-full"
          placeholder="Nickname"
        />
        <ThemedTextInput
          value={form.email}
          onChange={(e) => handleChange("email", e.nativeEvent.text)}
          keyboardType="email-address"
          className=" mt-1 w-full"
          placeholder="Email"
        />
        <ThemedTextInput
          value={form.password}
          onChange={(e) => handleChange("password", e.nativeEvent.text)}
          className=" mt-1 w-full"
          secure
          id="password-input"
          placeholder="Password"
        />
        <View className=" w-full mt-3 flex-row items-center justify-end">
          <ThemedButton
            onPress={() => {
              signup(form);
            }}
            disabled={validateForm}
            buttonColor="primary"
            className={
              "rounded py-1 px-5 " + (validateForm ? "opacity-50" : "")
            }
          >
            <ThemedText className="text-text-50">Sign Up</ThemedText>
          </ThemedButton>
        </View>
        <ThemedButton
          className=" mt-10 rounded bg-green-600 p-2"
          onPress={() => router.navigate("/login")}
        >
          <ThemedText className=" text-text-50 font-light">
            Back to Log In!
          </ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default SignUp;
