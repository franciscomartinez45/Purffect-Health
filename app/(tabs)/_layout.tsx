import { router, Tabs } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, Pressable, Text } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { getAuth, signOut } from "firebase/auth";
import {
  buttonPrimary,
  headerBackground,
  primary,
} from "@/components/styles/styles";

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);

  getAuth().onAuthStateChanged((user) => {
    setIsLoading(false);
    if (!user) {
      router.replace("/(landing)/login");
    }
  });

  if (isLoading) return <Text style={{ paddingTop: 30 }}>Loading...</Text>;

  return (
    <Tabs
      screenOptions={{
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
        name="index"
        options={{
          title: "Home",
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerRight: () => (
            <Pressable
              style={{ right: 25 }}
              onPress={() => {
                signOut(getAuth());
                Alert.alert(
                  "Signed Out",
                  "User has been logged out, redirected to landing page",
                  [{ text: "OK" }]
                );
              }}
            >
              {() => (
                <IconSymbol
                  name="person.crop.circle"
                  size={35}
                  color={"black"}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="calendarScreen"
        options={{
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar.badge.plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          title: "Find Care",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="mappin.and.ellipse" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
