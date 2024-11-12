
import { Tabs } from "expo-router";
import { TabBarIcon } from "../(tabs)/_layout";
import { headerBackground, textColor } from "@/components/styles/styles";

export default function LandingScreen() {
  return (
    <Tabs screenOptions={{}}>
      
      <Tabs.Screen
        name="register"
        options={{
           headerStyle: {backgroundColor: headerBackground},
          tabBarStyle:{backgroundColor: headerBackground
          },
          tabBarActiveTintColor: textColor,
          headerTintColor:textColor,
          title: "REGISTER",
          tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
        }}
      />
    
    <Tabs.Screen
        name="login"
        options={{
          headerStyle: {backgroundColor: headerBackground},
          tabBarStyle:{backgroundColor: headerBackground
          },
          tabBarActiveTintColor: textColor,
          headerTintColor:textColor,
          title: "LOG IN",
          tabBarIcon: ({ color }) => <TabBarIcon name="circle" color={color} />,
        }}
      />
      </Tabs>
  );
}
