import PetCalendar from "@/components/PetCalendar";
import { PetProfileModal } from "./PetProfileModal";
import { db } from "../firebaseConfig";

import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
              {item.uri ? ( // Check if there is a pet image
                <Image
                  source={{ uri: item.uri }} // Use the image URI
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.initial}>{item.name.charAt(0).toUpperCase()}</Text> // Fallback to initials if no image
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

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Space the items evenly
    padding: 10,
  },
  profileButton: {
    width: '30%', // Each circle takes up approximately one-third of the row
    alignItems: 'center', // Center the circle within the button
    marginBottom: 10, // Space between rows
  },
  circleButton: {
    width: 80, // Set the desired size
    height: 80, // Set the desired size
    borderRadius: 40, // Make it circular
    overflow: 'hidden', // Hide overflow to make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 24, // Adjust font size as needed
    color: '#fff', // Text color
  },
    image: {
    width: '100%', // Make the image fill the circle
    height: '100%', // Make the image fill the circle
    }
});

