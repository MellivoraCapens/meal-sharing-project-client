import React, { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useRouter } from "expo-router";

interface GuestOnlyProps {
  children: React.ReactNode;
}

const GuestOnly: React.FC<GuestOnlyProps> = ({ children }) => {
  const { isAuthenticated, isProcessing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isProcessing) {
      router.replace("/main");
    }
  }, [isAuthenticated, isProcessing]);

  return children;
};

export default GuestOnly;
