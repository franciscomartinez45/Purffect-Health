import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, Alert } from "react-native";
import { reminderStyles } from "./styles/styles";
import { IconSymbol } from "./ui/IconSymbol";
import { EditReminder } from "./editReminders";

export interface Reminder {
  description: string;
  id: string;
  date: string;
  time: string;
}

interface PetRemindersProp {
  petId: string;
}

export const PetReminders = (props: PetRemindersProp) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { currentUser } = getAuth();
  const [currentReminder, setReminder] = useState<Reminder>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const getReminders = () => {
    if (currentUser) {
      try {
        const petRef = doc(db, "user", currentUser.uid, "pets", props.petId);
        const remindersRef = collection(petRef, "reminders");
        const unsubscribe = onSnapshot(remindersRef, (snapshot) => {
          const remindersList: Reminder[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              description: data.description,
              date: data.date,
              time: data.time,
            };
          });

          const sortedReminders = remindersList.sort((a, b) => {
            return a.date.toString().localeCompare(b.date.toString());
          });
          setReminders(sortedReminders);
        });

        return unsubscribe;
      } catch (err) {
        console.error("Error fetching reminders:", err);
      }
    }
  };
  useEffect(() => {
    const unsubscribe = getReminders();
    return () => unsubscribe && unsubscribe();
  }, []);

  const deleteReminder = async (reminderId: string) => {
    if (currentUser) {
      try {
        const reminderRef = doc(
          db,
          "user",
          currentUser.uid,
          "pets",
          props.petId,
          "reminders",
          reminderId
        );
        await deleteDoc(reminderRef);
        Alert.alert("Reminder deleted successfully");
      } catch (err) {
        console.error("Error deleting reminder:", err);
        Alert.alert("Error deleting reminder");
      }
    }
  };

  const handleDeleteReminder = (reminderId: string) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        {
          text: "No",
          onPress: () => console.log("Delete canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deleteReminder(reminderId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  const handleOnPress = (reminder: Reminder) => {
    setReminder(reminder);
    setModalVisible(true);
  };
  const handleOnClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={reminderStyles.remindersListContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={reminderStyles.reminderItem}
            key={item.id}
            onPress={() => handleOnPress(item)}
          >
            <Text style={reminderStyles.reminderDescription}>
              {item.description}
            </Text>
            <Text style={reminderStyles.reminderDate}>
              {item.date} @ {item.time}
            </Text>
            <TouchableOpacity
              style={reminderStyles.deleteButton}
              onPress={() => handleDeleteReminder(item.id)}
            >
              <IconSymbol size={25} name="minus.circle.fill" color={"red"} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={reminderStyles.flatList}
      />
      {currentReminder && (
        <EditReminder
          isVisible={isModalVisible}
          onClose={handleOnClose}
          reminder={currentReminder}
          petId={props.petId}
        />
      )}
    </>
  );
};
