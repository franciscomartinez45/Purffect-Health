import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import { Alert, Pressable, Text } from "react-native";
import { router } from "expo-router";

import { getAuth, signOut } from "firebase/auth";
import { headerBackground, textColor } from "@/components/styles/styles";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{margin:5}} {...props} />;
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
          headerStyle: {backgroundColor: headerBackground},
          tabBarStyle:{backgroundColor: headerBackground
          },
          tabBarActiveTintColor: textColor,
          headerTintColor:textColor,
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
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
                  name="user"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
       <Tabs.Screen
        name="calendarScreen"
        options={{
          headerStyle: {backgroundColor: headerBackground},
          tabBarStyle:{backgroundColor: headerBackground
          },
          tabBarActiveTintColor: textColor,
          headerTintColor:textColor,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
     
      <Tabs.Screen
        name="map"
        options={{
          headerStyle: {backgroundColor: headerBackground},
          tabBarStyle:{backgroundColor: headerBackground
          },
          tabBarActiveTintColor: textColor,
          headerTintColor:textColor,
          title: "Find Care",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map" color={color} />
          ),
         
        }}
      />
    </Tabs>
  );
}
