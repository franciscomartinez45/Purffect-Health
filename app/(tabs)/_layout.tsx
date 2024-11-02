import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import { Alert, Pressable, Text } from "react-native";
import { router } from "expo-router";

import { getAuth, signOut } from "firebase/auth";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Pet Profiles",
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-pen" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                signOut(getAuth());
                Alert.alert(
                  "Signed Out",
                  "User has been logged out, redirected to landing page",
                  [{ text: "OK" }]
                );
              }}
            >
              {({ pressed }) => (
                <FontAwesome
                  name="door-open"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
