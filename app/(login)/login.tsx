import { Alert, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Text } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { loginStyles, profileSettings } from "../../components/styles/styles";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((user) => {
        if(!user.user.emailVerified){
          Alert.alert(
            "Email Verification required",
            "Please verify your email",
            [{ text: "OK" }]
          );
        }
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
      <Text style={profileSettings.label}>Email:</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="e.g. AdaLovelace@toromail.csudh.edu"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text.toLowerCase())}
        autoCorrect={false}
        placeholderTextColor={"#D3D3D3"}
      />
      <Text style={profileSettings.label}>Password</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"#D3D3D3"}
      />

      <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
