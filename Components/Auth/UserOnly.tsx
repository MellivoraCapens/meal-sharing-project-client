import React, { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useRouter } from "expo-router";
import ThemedLoader from "../ThemedLoader";

interface UserOnlyProps {
  children: React.ReactNode;
}

const UserOnly: React.FC<UserOnlyProps> = ({ children }) => {
  const { isAuthenticated, isProcessing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isProcessing) {
      router.replace("/");
    }
  }, [isAuthenticated, isProcessing]);

  if (!isAuthenticated || isProcessing) {
    return <ThemedLoader />;
  }

  return children;
};

export default UserOnly;
