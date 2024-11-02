import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, ScrollView } from "react-native";


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
    
    <FlatList
      data={reminders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.remindersListContent}
      showsVerticalScrollIndicator={true} // Shows the scroll indicator
      nestedScrollEnabled={true} // Enables nested scrolling for iOS
      renderItem={({ item }) => (
        <View style={styles.reminderItem} key={item.id}>
          <Text style={styles.reminderDescription}>Description: {item.description}</Text>
          <Text style={styles.reminderDate}>Date: {new Date(item.dateTime).toLocaleDateString()}</Text>
          <Text style={styles.reminderTime}>Time: {new Date(item.dateTime).toLocaleTimeString()}</Text>
          <Text style={styles.reminderId}>Id: {item.id}</Text>
        </View>
      )}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  remindersListContent: {
    padding: 20, // Add padding to the FlatList
  },
  flatList: {
    width: '100%', // Set FlatList width to 90% of the parent container
  },
  reminderItem: {
    backgroundColor: '#ffffff', // White background for each reminder item
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%', // Set each reminder item width to 95% of FlatList width
    shadowColor: '#000', // Shadow effect for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  reminderDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50', // Darker text color for better readability
  },
  reminderDate: {
    fontSize: 14,
    color: '#7f8c8d', // Lighter color for date
  },
  reminderTime: {
    fontSize: 14,
    color: '#7f8c8d', // Lighter color for time
  },
  reminderId: {
    fontSize: 12,
    color: '#bdc3c7', // Grey color for ID
  },
});
