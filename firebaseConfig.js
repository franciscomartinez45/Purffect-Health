import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserSessionPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import ReactNativePersistance from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence:
    Platform.OS === "web"
      ? browserSessionPersistence
      : getReactNativePersistence(ReactNativePersistance),
});
export const db = getFirestore(app);
