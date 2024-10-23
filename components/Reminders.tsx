import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Reminder {
  id: string;
  description: string;
  dateTime: string;
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
    //refresh the list immediately
    const unsubscribe = getReminders();
    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <Text>Reminders:</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.remindersListContent}
        showsVerticalScrollIndicator={true} // Shows the scroll indicator
        nestedScrollEnabled={true} // Enables nested scrolling for iOS
        renderItem={({ item }) => (
          <View style={styles.reminderItem} key={item.id}>
            <Text>Description: {item.description}</Text>
            <Text>Date: {new Date(item.dateTime).toLocaleDateString()}</Text>
            <Text>Time: {new Date(item.dateTime).toLocaleTimeString()}</Text>
            <Text>Id: {item.id}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  reminderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  remindersList: {
    flex: 1,
  },
  remindersListContent: {
    paddingBottom: 20,
  },
});
