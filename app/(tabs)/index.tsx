import { ShowPets } from "@/components/PetProfiles";
import React, { useEffect, useState } from "react";
import { indexStyles } from "@/components/styles/styles";
import { Text, TouchableOpacity, View } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { EditPets } from "@/components/editPetModal";
import { IconSymbol } from "@/components/ui/IconSymbol";

export interface UserData {
  firstName: string;
  lastName: String;
  email: String;
}

export default function IndexScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userHasPets, setUserPets] = useState<boolean>(false);
  const { currentUser } = getAuth();
  const [editModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser) {
        const profileDocRef = doc(db, "user", currentUser.uid);
        const profileData = await getDoc(profileDocRef);

        if (profileData.exists()) {
          setUserData(profileData.data() as UserData);
        }
        const petsCollectionRef = collection(
          db,
          "user",
          currentUser.uid,
          "pets"
        );
        const unsubscribe = onSnapshot(petsCollectionRef, (snapshot) => {
          if (!snapshot.empty) {
            setUserPets(true);
          } else {
            setUserPets(false);
          }
        });
        return () => {
          unsubscribe();
        };
      }
    };

    getUserData();
  }, [currentUser, db]);

  const handleOnPress = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={indexStyles.container}>
      {!userHasPets ? (
        <View style={indexStyles.welcomeContainer}>
          <Text style={indexStyles.welcomeText}>Purrfect-Health</Text>
          <Text style={indexStyles.smallText}>
            Welcome {userData?.firstName}, your one stop destination for your
            pet needs!
          </Text>
          <Text style={indexStyles.getStartedText}>
            **Click on the plus sign to get started**
          </Text>
        </View>
      ) : (
        <View style={indexStyles.welcomeContainer}>
          <Text style={indexStyles.welcomeText}>Welcome back</Text>

          <View style={indexStyles.smallTextContainer}>
            <Text style={indexStyles.smallText}>
              Your Pets are listed below {userData?.firstName}:
            </Text>
            <TouchableOpacity
              onPress={handleOnPress}
              style={indexStyles.penButton}
            >
              <IconSymbol
                size={40}
                name="pencil.and.ellipsis.rectangle"
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <EditPets onClose={handleCloseModal} visible={editModalVisible} />
      <ShowPets />
    </View>
  );
}
