import React, { useEffect, useState } from 'react';
import { View, Text,Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { buttonPrimary, calendarModalStyle, calendarStyle, primary, textColor} from './styles/styles';



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
  
  function convertDate(passedDate: String){
    const dateString = passedDate.split(",")[0].split("/");
    let month = dateString[1];
    if(month.charAt(0)!='1'){
      month = "0"+ month;
    }
    return `${dateString[2]}-${dateString[0]}-${month}`;
    
  }
  useEffect(() => {
    const getReminders = async () => {
      if (currentUser) {
        const petsCollection = collection(db, `user/${currentUser.uid}/pets`);
        const unsubscribe = onSnapshot(petsCollection, async (snapshot) => {
          const remindersData: RemindersByDate = {};

          for (const petDoc of snapshot.docs) {
            const petName = petDoc.data().name; 
            const remindersCollection = collection(petsCollection, petDoc.id, 'reminders');
            const remindersSnapshot = await getDocs(remindersCollection);

            remindersSnapshot.forEach(doc => {
              const data = doc.data() as Reminder;
              const data_date = data.date;
              const date = convertDate(data_date);
             
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
    <View>
      <Calendar style = {calendarStyle.calendar}
       
theme={{
  backgroundColor: primary, 
  calendarBackground: primary, 
  textSectionTitleColor: textColor, 
  selectedDayTextColor: primary, 
  todayTextColor: 'red', 
  dayTextColor: textColor,
  textDisabledColor: '#d1d1d6', 
  arrowColor: textColor, 
  monthTextColor: textColor, 
  textDayFontWeight: '500',
  textMonthFontWeight: '700',
  textDayHeaderFontWeight: '600',
  textDayFontSize: 20,
  textMonthFontSize: 20,
  textDayHeaderFontSize: 14,
}}
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
        <View style={calendarModalStyle.modalOverlay}>
          <View style={calendarModalStyle.modalContainer}>
            <Text style={calendarModalStyle.modalTitle}>Reminders for {selectedDate}</Text>
            <ScrollView style={calendarModalStyle.remindersList}>
              {selectedDate && reminders[selectedDate]?.length ? (
                reminders[selectedDate].map((reminder, index) => (
                  <Text key={index} style={calendarModalStyle.reminderText}>
                    • {reminder.petName}: {reminder.description}
                  </Text>
                ))
              ) : (
                <Text style={calendarModalStyle.noRemindersText}>No reminders for this date.</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={calendarModalStyle.closeButton} onPress={closeModal}>
              <Text style={calendarModalStyle.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};