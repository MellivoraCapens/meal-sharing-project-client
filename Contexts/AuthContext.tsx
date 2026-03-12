import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface IAuthContext {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (body: ISignUpUserForm) => Promise<void>;
  logout: () => void;
  loginError?: string | null;
  isProcessing: boolean;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const URL = process.env.EXPO_PUBLIC_API_URL;

  const login = async (email: string, password: string) => {
    try {
      setLoginError(null);
      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      const data = await JSON.parse(text);

      if (!data.success) {
        console.log(data);
        setLoginError(data.error || "Login failed!");
        throw new Error(data.error || "Login failed!");
      }
      setToken(data.token);
      await AsyncStorage.setItem("token", `Bearer ${data.token}`);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const signup = async (body: ISignUpUserForm) => {
    try {
      const response = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const text = await response.text();
      const data = await JSON.parse(text);

      if (!data.success) {
        throw new Error(data.message || "Signup failed");
      }
      setToken(data.token);
      await AsyncStorage.setItem("token", `Bearer ${data.token}`);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getMe = async () => {
    setIsProcessing(true);
    const storedToken = await AsyncStorage.getItem("token");
    if (!storedToken) {
      setIsProcessing(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(URL + "/auth/me", {
        method: "GET",
        headers: {
          Authorization: storedToken,
        },
      });
      const text = await response.text();
      const data = await JSON.parse(text);

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch user data");
      }
      setUser(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("GetMe error:", error);
      setIsAuthenticated(false);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getMe();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginError,
        logout,
        isProcessing,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
