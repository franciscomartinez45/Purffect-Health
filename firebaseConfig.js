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
  apiKey: "AIzaSyBn8evBTGXMpcnr21tk4tvevTffhYUADfM",
  authDomain: "purrfect-health.firebaseapp.com",
  projectId: "purrfect-health",
  storageBucket: "purrfect-health.appspot.com",
  messagingSenderId: "761370362351",
  appId: "1:761370362351:web:3dbaef5cd072fb13b5b61a",
  measurementId: "G-W837PDNW1P",
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence:
    Platform.OS === "web"
      ? browserSessionPersistence
      : getReactNativePersistence(ReactNativePersistance),
});
export const db = getFirestore(app);
