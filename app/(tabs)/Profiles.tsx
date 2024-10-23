import { PetProfileModal } from "../../components/PetProfileModal";
import { db } from "../../firebaseConfig";

import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Pet {
  name: string;
  weight: string;
  age: string;
  id: string;
}
export function ShowPets() {
  const [reminders, setReminders] = useState<Pet[]>([]);
  const { currentUser } = getAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [petId, setPetId] = useState<string>("");
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
  const handleProfile = (petId: string) => {
    setPetId(petId);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView>
      <Text>Pet Profiles:</Text>
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleProfile(item.id);
            }}
          >
            <View style={styles.reminderItem} key={item.id}>
              <Text>Name: {item.name}</Text>
              <Text>Age: {item.age}</Text>
              <Text>Weight: {item.weight}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <PetProfileModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        petId={petId}
      ></PetProfileModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  reminderItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
