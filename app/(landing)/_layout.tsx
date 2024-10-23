import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../(tabs)/_layout";

export default function LandingScreen() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="login"
        options={{
          title: "LOG IN",
          tabBarIcon: ({ color }) => <TabBarIcon name="circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "REGISTER",
          tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
