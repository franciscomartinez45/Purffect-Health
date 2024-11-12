import { Alert, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Text } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { loginStyles } from "@/components/styles/styles";
export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((user) => {
        if (user) router.replace("/(tabs)");
      })
      .catch((Error) => {
        Alert.alert("User not found", "Email and Password are incorrect", [
          { text: "OK" },
        ]);
      });
  };
  return (
    <SafeAreaView style={loginStyles.container}>
      <Text style={loginStyles.welcomeText}>Purrfect Health</Text>
      <Text style={loginStyles.title}>Welcome Back!</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Email"
        placeholderTextColor={"black"}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        placeholderTextColor={"black"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
