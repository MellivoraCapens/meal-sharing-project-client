/// <reference types="expo/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_EMAIL_REGEX: string;
    EXPO_PUBLIC_PHOTON_API: string;
  }
}
