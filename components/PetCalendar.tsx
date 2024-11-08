import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { calendarStyles, styles } from './styles/styles';

interface Reminder {
  date: string; 
  description: string;
  petName: string;
}

interface RemindersByDate {
  [date: string]: { petName: string; description: string }[]; 
}

export const PetCalendar = () => {
  const [reminders, setReminders] = useState<RemindersByDate>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { currentUser } = getAuth();
  
  useEffect(() => {
    const getReminders = async () => {
      if (currentUser) {
        const petsCollection = collection(db, `user/${currentUser.uid}/pets`);
        const unsubscribe = onSnapshot(petsCollection, async (snapshot) => {
          const remindersData: RemindersByDate = {};

          for (const petDoc of snapshot.docs) {
            const petName = petDoc.data().name; // Get the pet's name
            const remindersCollection = collection(petsCollection, petDoc.id, 'reminders');
            const remindersSnapshot = await getDocs(remindersCollection);

            remindersSnapshot.forEach(doc => {
              const data = doc.data() as Reminder;
              const date = new Date(data.date).toISOString().split('T')[0]; 
              const reminderDescription = data.description;

              if (!remindersData[date]) {
                remindersData[date] = [];
              }
              remindersData[date].push({ petName, description: reminderDescription });
            });
          }

          setReminders(remindersData);
        });

        return () => unsubscribe(); 
      }
    };
    getReminders();
  }, []);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        style={styles.calendar}
        markedDates={Object.keys(reminders).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: 'red' };
          return acc;
        }, {} as Record<string, { marked: boolean; dotColor: string }>)}
        onDayPress={(day: { dateString: string; }) => onDayPress(day)}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={calendarStyles.modalOverlay}>
          <View style={calendarStyles.modalContainer}>
            <Text style={calendarStyles.modalTitle}>Reminders for {selectedDate}</Text>
            <ScrollView style={calendarStyles.remindersList}>
              {selectedDate && reminders[selectedDate]?.length ? (
                reminders[selectedDate].map((reminder, index) => (
                  <Text key={index} style={calendarStyles.reminderText}>
                    • {reminder.petName}: {reminder.description}
                  </Text>
                ))
              ) : (
                <Text style={calendarStyles.noRemindersText}>No reminders for this date.</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={calendarStyles.closeButton} onPress={closeModal}>
              <Text style={calendarStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
