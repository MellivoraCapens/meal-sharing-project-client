import { Stack } from "expo-router";
import GuestOnly from "../../Components/Auth/GuestOnly";

export default function AuthLayout() {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </GuestOnly>
  );
}
