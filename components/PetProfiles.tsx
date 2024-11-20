import { PetProfileModal } from "./PetProfileModal";
import { db } from "../firebaseConfig";
import { petProfileStyle, showPetsStyle } from "./styles/styles";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Pet {
  name: string;
  weight: string;
  age: string;
  id: string;
  uri: string;
}

export function ShowPets() {
  const [pets, setReminders] = useState<Pet[]>([]);
  const { currentUser } = getAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPet, setPet] = useState<Pet | null>(null);
  const getPets = () => {
    if (currentUser) {
      try {
        const petsRef = collection(db, "user", currentUser.uid, "pets");
        const unsubscribe = onSnapshot(petsRef, (snapshot) => {
          const petList: Pet[] = [];
          snapshot.forEach((doc) => {
            petList.push({
              id: doc.id,
              name: doc.data().name,
              weight: doc.data().weight,
              age: doc.data().age,
              uri: doc.data().uri,
            });
          });
          setReminders(petList);
        });
        return unsubscribe;
      } catch (err) {
        console.error("Error fetching reminders:", err);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = getPets();
    return () => unsubscribe && unsubscribe();
  }, []);
  const handleProfile = (pet: Pet) => {
    setPet(pet);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView>
      <View style={showPetsStyle.container}>
        {pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            onPress={() => handleProfile(pet)}
            style={petProfileStyle.profileButton}
          >
            <View style={showPetsStyle.circleButton}>
              {pet.uri ? (
                <Image
                  source={{ uri: pet.uri }}
                  style={showPetsStyle.imageProfile}
                  resizeMode="cover"
                />
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {currentPet && (
        <PetProfileModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          pet={currentPet}
        ></PetProfileModal>
      )}
    </SafeAreaView>
  );
}
