import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, signOut, updateEmail, updatePassword } from "firebase/auth";
import { db } from "@/firebaseConfig";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
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
    const getUserData = async () => {
      if (currentUser) {
        const profileData = await getDoc(doc(db, "user", currentUser.uid));
        if (profileData.exists()) {
          setUserData(profileData.data() as UserData);
          setNewEmail(profileData.data().email);
        } else {
          console.log("No data found for user.");
        }
      }
    };
    getUserData();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (currentUser && userData) {
      try {
        if (newEmail && newEmail !== userData.email) {
          await updateEmail(currentUser, newEmail);
        }
        if (newPassword) {
          await updatePassword(currentUser, newPassword);
        }
        await updateDoc(doc(db, "user", currentUser.uid), { email: newEmail });
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
      <Text style={profileSettings.title}>Information</Text>

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
        placeholder="Email"
        placeholderTextColor={"black"}
      />

      <Text style={profileSettings.label}>New Password</Text>
      <TextInput
        style={profileSettings.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter new password"
        secureTextEntry
      />

      <View style={petProfileStyle.buttonProfileContainer}>
        <TouchableOpacity style={loginStyles.button} onPress={handleSignOut}>
          <Text style={loginStyles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={loginStyles.button} onPress={handleUpdate}>
          <Text style={loginStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
