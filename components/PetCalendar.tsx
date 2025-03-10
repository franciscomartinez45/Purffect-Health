import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  buttonPrimary,
  calendarModalStyle,
  calendarStyle,
  primary,
} from "./styles/styles";

export interface Reminder {
  date: string;
  time: string;
  description: string;
  petName: string;
  id: string;
}

interface RemindersByDate {
  [date: string]: { petName: string; description: string; time: string }[];
}

export const PetCalendar = () => {
  const [reminders, setReminders] = useState<RemindersByDate>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { currentUser } = getAuth();

  function convertDate(passedDate: string) {
    const [day, month, year] = passedDate.split(",")[0].split("/");
    const formattedMonth = month.length === 1 ? "0" + month : month;
    return `${year}-${day}-${formattedMonth}`;
  }

  useEffect(() => {
    if (!currentUser) return;

    const petsCollection = collection(db, `user/${currentUser.uid}/pets`);
    const unsubscribePets = onSnapshot(petsCollection, (petsSnapshot) => {
      const unsubscribeReminders: (() => void)[] = [];

      petsSnapshot.forEach((petDoc) => {
        const petName = petDoc.data().name;
        const remindersCollection = collection(
          petsCollection,
          petDoc.id,
          "reminders"
        );

        const unsubscribeReminder = onSnapshot(
          remindersCollection,
          (remindersSnapshot) => {
            setReminders((prevReminders) => {
              const updatedReminders = { ...prevReminders };
              Object.keys(updatedReminders).forEach((date) => {
                updatedReminders[date] = updatedReminders[date].filter(
                  (reminder) => reminder.petName !== petName
                );
      
                if (updatedReminders[date].length === 0) {
                  delete updatedReminders[date];
                }
              });
              remindersSnapshot.forEach((doc) => {
                const data = doc.data() as Reminder;
                const date = convertDate(data.date);

                if (!updatedReminders[date]) {
                  updatedReminders[date] = [];
                }
                updatedReminders[date].push({
                  petName,
                  description: data.description,
                  time: data.time,
                });
              });

              return updatedReminders;
            });
          }
        );

        unsubscribeReminders.push(unsubscribeReminder);
      });

      return () => {
        unsubscribeReminders.forEach((unsubscribe) => unsubscribe());
      };
    });

    return () => {
      unsubscribePets();
    };
  }, [currentUser, db, setReminders]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
  };

  return (
    <View>
      <Calendar
        style={calendarStyle.calendar}
        theme={{
          backgroundColor: primary,
          calendarBackground: primary,
          textSectionTitleColor: buttonPrimary,
          selectedDayTextColor: buttonPrimary,
          todayTextColor: "red",
          dayTextColor: "black",
          textDisabledColor: "#d1d1d6",
          arrowColor: buttonPrimary,
          monthTextColor: buttonPrimary,
          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "600",
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        markedDates={Object.keys(reminders).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: "red" };
          return acc;
        }, {} as Record<string, { marked: boolean; dotColor: string }>)}
        onDayPress={(day: { dateString: string }) => onDayPress(day)}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={calendarModalStyle.modalOverlay}>
          <View style={calendarModalStyle.modalContainer}>
            <Text style={calendarModalStyle.modalTitle}>
              Reminders for {selectedDate}
            </Text>
            <ScrollView style={calendarModalStyle.remindersList}>
              {selectedDate && reminders[selectedDate]?.length ? (
                reminders[selectedDate].map((reminder, index) => (
                  <Text key={index} style={calendarModalStyle.reminderText}>
                    • {reminder.petName}: {reminder.description} @{" "}
                    {reminder.time}
                  </Text>
                ))
              ) : (
                <Text style={calendarModalStyle.noRemindersText}>
                  No reminders for this date.
                </Text>
              )}
            </ScrollView>
            <TouchableOpacity
              style={calendarModalStyle.closeButton}
              onPress={closeModal}
            >
              <Text style={calendarModalStyle.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
