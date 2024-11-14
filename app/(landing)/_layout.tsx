import { Slot, Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  buttonPrimary,
  headerBackground,
} from "../../components/styles/styles";
import { HapticTab } from "@/components/HapticTab";

import { Platform } from "react-native";

export default function LandingScreen() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="register"
        options={{
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          title: "Register",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="square.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          title: "Log In",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
