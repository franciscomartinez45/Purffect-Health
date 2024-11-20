import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { reminderStyles } from "./styles/styles";

interface Reminder {
  dateTime: string;
  description: string;
  id: string;
}

interface PetRemindersProp {
  petId: string;
}
export const PetReminders = (props: PetRemindersProp) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { currentUser } = getAuth();

  const getReminders = () => {
    if (currentUser) {
      try {
        const petRef = doc(db, "user", currentUser.uid, "pets", props.petId);
        const remindersRef = collection(petRef, "reminders");
        const unsubscribe = onSnapshot(remindersRef, (snapshot) => {
          const remindersList: Reminder[] = [];
          snapshot.forEach((doc) => {
            remindersList.push({
              id: doc.id,
              description: doc.data().description,
              dateTime: doc.data().date,
            });

            const sortedReminders = remindersList.sort((a, b) => {
              return (
                new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
              );
            });
            setReminders(sortedReminders);
          });
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

  return (
    <FlatList
      data={reminders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={reminderStyles.remindersListContent}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
      renderItem={({ item }) => (
        <View style={reminderStyles.reminderItem} key={item.id}>
          <Text style={reminderStyles.reminderDescription}>
            Description: {item.description}
          </Text>
          <Text style={reminderStyles.reminderDate}>Date: {item.dateTime}</Text>
          <Text style={reminderStyles.reminderId}>Id: {item.id}</Text>
        </View>
      )}
      style={reminderStyles.flatList}
    />
  );
};
