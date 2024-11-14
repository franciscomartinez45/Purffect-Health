import { ShowPets } from "@/components/PetProfiles";

import React, { useEffect, useState } from "react";

import { indexStyles } from "@/components/styles/styles";
import { Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export interface UserData {
  firstName: string;
  lastName: String;
  email: String;
}

export default function indexScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userHasPets, setUserPets] = useState<boolean>(false);
  const { currentUser } = getAuth();

  const getUserData = async () => {
    if (currentUser) {
      const profileData = await getDoc(doc(db, "user", currentUser.uid));

      if (profileData.exists()) {
        setUserData(profileData.data() as UserData);
      } else {
        console.log("No data");
      }
      const petsCollectionRef = collection(db, "user", currentUser.uid, "pets");
      const petsSnapshot = await getDocs(petsCollectionRef);
      if (!petsSnapshot.empty) {
        setUserPets(true);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={indexStyles.container}>
      {!userHasPets ? (
        <View style={indexStyles.welcomeContainer}>
          <Text style={indexStyles.welcomeText}>
            Welcome to Purrfect Health {userData?.firstName}
          </Text>
          <Text style={indexStyles.smallText}>
            One stop destination for your pet needs
          </Text>
        </View>
      ) : (
        <View style={indexStyles.welcomeContainer}>
          <Text style={indexStyles.welcomeText}>
            Welcome back {userData?.firstName}
          </Text>
          <Text style={indexStyles.smallText}>Your Pets:</Text>
        </View>
      )}

      <ShowPets />
    </View>
  );
}
