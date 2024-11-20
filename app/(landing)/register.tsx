import { TextInput, Text, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { loginStyles, profileSettings } from "../../components/styles/styles";
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
      <Text style={profileSettings.label}>First Name:</Text>
      <TextInput
        style={loginStyles.input}
        onChangeText={(text) => setFirstName(text)}
        placeholder="Alan"
      />
      <Text style={profileSettings.label}>Last Name:</Text>
      <TextInput
        style={loginStyles.input}
        onChangeText={(text) => setLastName(text)}
        placeholder="Turing"
      />
      <Text style={profileSettings.label}>Email:</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="e.g. AlanTuring110@toromail.csudh.edu"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={profileSettings.label}>Password</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={loginStyles.button} onPress={handleRegister}>
        <Text style={loginStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
