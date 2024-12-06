import { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  getAuth,
  sendEmailVerification,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { db } from "@/firebaseConfig";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import {
  loginStyles,
  petProfileStyle,
  profileSettings,
} from "@/components/styles/styles";
import { UserData } from "./index";

export default function UserProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { currentUser } = getAuth();

  useEffect(() => {
    if (currentUser) {
      const profileDocRef = doc(db, "user", currentUser.uid);
      const unsubscribe = onSnapshot(
        profileDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as UserData;
            setUserData(data);
            setNewEmail(String(data.email));
          } else {
            console.log("No data found for user.");
          }
        },
        (error) => {
          console.error("Error fetching user profile data: ", error);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser, db]);

  const handleUpdate = async () => {
    if (currentUser && userData) {
      const updatedUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };
      try {
        if (newEmail && newEmail !== userData.email) {
          if (!currentUser.emailVerified) {
           //email verification needed
            await sendEmailVerification(currentUser);
            return;
          }
          await updateEmail(currentUser, newEmail);
          updatedUser.email = newEmail;
        }
        if (newPassword) {
          await updatePassword(currentUser, newPassword);
          setNewPassword("");
          Alert.alert(
            "Password Changed",
            "User password has been succesfully updated",
            [{ text: "OK" }]
          );
        }
        const userRef = doc(db, "user", currentUser.uid);
        await updateDoc(userRef, updatedUser);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };
  const handleSignOut = () => {
    signOut(getAuth());
    Alert.alert(
      "Signed Out",
      "User has been logged out, redirected to landing page",
      [{ text: "OK" }]
    );
  };
  return (
    <View style={profileSettings.modalContainer}>
      <Text style={profileSettings.title}>Your Current Information:</Text>

      <Text style={profileSettings.label}>First Name</Text>
      <Text style={profileSettings.text}>{userData?.firstName}</Text>

      <Text style={profileSettings.label}>Last Name</Text>
      <Text style={profileSettings.text}>{userData?.lastName}</Text>

      <Text style={profileSettings.label}>Current Email</Text>
      <Text style={profileSettings.text}>{userData?.email}</Text>

      <Text style={profileSettings.label}>New Email</Text>
      <TextInput
        style={profileSettings.input}
        keyboardType="email-address"
        onChangeText={(text) => setNewEmail(text.toLowerCase())}
        placeholder="e.g. AdaLovelace@toromail.csudh.edu"
        placeholderTextColor={"#D3D3D3"}
      />

      <Text style={profileSettings.label}>New Password</Text>
      <TextInput
        style={profileSettings.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter new password"
        placeholderTextColor={"#D3D3D3"}
        secureTextEntry
      />

      <View style={petProfileStyle.buttonProfileContainer}>
        <TouchableOpacity style={loginStyles.button} onPress={handleSignOut}>
          <Text style={loginStyles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={loginStyles.button} onPress={handleUpdate}>
          <Text style={loginStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
