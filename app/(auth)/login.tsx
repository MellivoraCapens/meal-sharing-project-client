import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
// Components
import ThemedButton from "../../Components/ThemedButton";
import ThemedText from "../../Components/ThemedText";
import ThemedTextInput from "../../Components/ThemedTextInput";
import ThemedView from "../../Components/ThemedView";
// Hooks
import { useAuth } from "../../Hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const { login, loginError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ThemedView isSafeArea className="flex-1 items-center justify-center">
      <ThemedText textColor="text" size="xl">
        Log In
      </ThemedText>
      <View className=" mt-5 w-[70%] max-w-96 items-center justify-center">
        <ThemedTextInput
          onChange={(e) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
            if (regex.test(e.nativeEvent.text)) {
              setEmail(e.nativeEvent.text);
            }
            if (!regex.test(e.nativeEvent.text)) {
              setEmail("");
            }
          }}
          className=" mt-1 w-full"
          danger={!!loginError}
          placeholder="Email"
        />
        <ThemedTextInput
          onChange={(e) => {
            const passwordRegex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{12,}$/;
            if (passwordRegex.test(e.nativeEvent.text)) {
              setPassword(e.nativeEvent.text);
            }
            if (!passwordRegex.test(e.nativeEvent.text)) {
              setPassword("");
            }
          }}
          className=" mt-1 w-full"
          danger={!!loginError}
          secure
          placeholder="Password"
        />
        {loginError && (
          <ThemedText className=" self-start text-rose-600" size="sm">
            **{loginError}
          </ThemedText>
        )}
        <View className=" w-full mt-1 flex-row items-center justify-between">
          <Pressable onPress={() => router.navigate("/signup")}>
            <ThemedText
              size="sm"
              textColor="primary"
              className=" font-light underline active:opacity-5"
            >
              Forgot Password?
            </ThemedText>
          </Pressable>
          <ThemedButton
            buttonColor="primary"
            onPress={() => login(email, password)}
            disabled={!(email && password)}
            className={
              "rounded py-1  px-5 " + (email && password ? "" : "opacity-50")
            }
          >
            <ThemedText className="text-text-50">Log In</ThemedText>
          </ThemedButton>
        </View>
        <ThemedButton
          className=" mt-10 rounded  bg-green-600 p-2"
          onPress={() => router.navigate("/signup")}
        >
          <ThemedText className=" text-text-50 font-light">
            Create an Account!
          </ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default Login;
