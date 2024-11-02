import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Import your initialized Firestore database
import { getAuth } from 'firebase/auth';

interface Reminder {
  date: string; // The date string in ISO format
  description: string; // The description of the reminder
}



interface RemindersByDate {
  [date: string]: string[]; // Date string (YYYY-MM-DD) mapped to an array of reminders
}

const PetCalendar: React.FC = () => {
  const [reminders, setReminders] = useState<RemindersByDate>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for the selected date
  const auth = getAuth();

  useEffect(() => {
    const fetchReminders = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.log("User is not authenticated");
        return; // Exit if user is not authenticated
      }

      const petsCollection = collection(db, `user/${user.uid}/pets`);
      const unsubscribe = onSnapshot(petsCollection, async (snapshot) => {
        const remindersData: RemindersByDate = {};

        // Loop through each pet document
        for (const petDoc of snapshot.docs) {
          const remindersCollection = collection(petsCollection, petDoc.id, 'reminders');
          const remindersSnapshot = await getDocs(remindersCollection);

          // Loop through each reminder document
          remindersSnapshot.forEach(doc => {
            const data = doc.data() as Reminder;
            const date = new Date(data.date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
            const reminderDescription = data.description;

            // Initialize the date array if not already present
            if (!remindersData[date]) {
              remindersData[date] = [];
            }
            remindersData[date].push(reminderDescription);
          });
        }

        setReminders(remindersData);
      });

      return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
    };

    fetchReminders();
  }, [auth]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString); 
    console.log(selectedDate);
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        style={styles.calendar}
        markedDates={Object.keys(reminders).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: 'blue' };
          return acc;
        }, {} as Record<string, { marked: boolean; dotColor: string }>)}
        onDayPress={(day: any) => {
    onDayPress(day);
  }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    padding: 10,
  },
  calendar: {
    width: '100%',
    height: 400,
  },
  reminderList: {
    marginTop: 20,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reminderText: {
    fontSize: 14,
  },
  noReminderText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PetCalendar;
