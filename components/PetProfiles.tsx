import {PetCalendar} from "@/components/PetCalendar";
import { PetProfileModal } from "./PetProfileModal";
import { db } from "../firebaseConfig";
import { styles } from "./styles/styles";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Pet {
  
  name: string;
  weight: string;
  age: string;
  id: string;
  uri: string;
}

export function ShowPets() {
  const [reminders, setReminders] = useState<Pet[]>([]);
  const {currentUser } = getAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPet,setPet]=useState<Pet | null>(null)
  const getPets = () => {
    if (currentUser) {
      try {
        const remindersRef = collection(db, "user", currentUser.uid, "pets");
        const unsubscribe = onSnapshot(remindersRef, (snapshot) => {
          const remindersList: Pet[] = [];
          snapshot.forEach((doc) => {
            remindersList.push({
              id: doc.id,
              name: doc.data().name,
              weight: doc.data().weight,
              age: doc.data().age,
              uri: doc.data().uri
            });
          });
          setReminders(remindersList);
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
  const handleProfile = (item: Pet) => {
    setPet(item);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView>
      <Text>Pet Profiles:</Text>
      <View style={styles.container}>
      {reminders.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handleProfile(item)} style={styles.profileButton}>
           <View style={styles.circleButton}>
              {item.uri ? ( 
                <Image
                  source={{ uri: item.uri }} 
                  style={styles.imageProfile}
                  resizeMode="cover"
                />
              ) : (
                <></>
              )}
            </View>
        </TouchableOpacity>
      ))}
    </View>
    <PetCalendar></PetCalendar>
    {currentPet &&
      <PetProfileModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        pet={currentPet}
      ></PetProfileModal>
    }
    </SafeAreaView>
  );
}


