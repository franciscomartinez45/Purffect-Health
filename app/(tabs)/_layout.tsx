import { router, Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { getAuth } from "firebase/auth";
import { buttonPrimary, headerBackground } from "@/components/styles/styles";

export default function TabLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set to true after the initial render
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setIsLoading(false);
      if (isMounted && !user) {
        router.replace("/(landing)/login");
      }
    });

    return unsubscribe;
  }, [isMounted]);

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
        name="calendar"
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
        }}
      />
      <Tabs.Screen
        name="addPet"
        options={{
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          title: "Add Pet",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={80} name="plus.square.fill" color={color} />
          ),
        }}
      ></Tabs.Screen>
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
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile Settings",
          headerStyle: { backgroundColor: headerBackground },
          tabBarStyle: { backgroundColor: headerBackground },
          tabBarActiveTintColor: buttonPrimary,
          headerTintColor: buttonPrimary,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person.crop.square.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
