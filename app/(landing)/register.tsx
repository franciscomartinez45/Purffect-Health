import { TextInput, Text, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { loginStyles } from "../../components/styles/styles";
import { useState } from "react";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const handleRegister = () => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          await setDoc(doc(db, "user", user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
          })
            .then(() => router.replace("/(tabs)"))
            .catch((err) => {
              alert(err?.message);
            });
        }
      })
      .catch((err) => {
        alert(err?.message);
      });
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <Text style={loginStyles.welcomeText}>Purrfect Health</Text>
      <Text style={loginStyles.title}>
        New to the App? Register for a free account!
      </Text>

      <TextInput
        style={loginStyles.input}
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        placeholderTextColor={"black"}
      />
      <TextInput
        style={loginStyles.input}
        onChangeText={(text) => setLastName(text)}
        placeholder="Last Name"
        placeholderTextColor={"black"}
      />

      <TextInput
        style={loginStyles.input}
        placeholder="Email"
        placeholderTextColor={"black"}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        placeholderTextColor={"black"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={loginStyles.button} onPress={handleRegister}>
        <Text style={loginStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
