import React, { useState } from "react";
import { TextInput, Text, Button, Alert, StyleSheet, Modal, View } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface AddReminderProps {
  petId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const AddReminder = (props: AddReminderProps) => {
  const { currentUser } = getAuth();
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

   const addUserData = async () => {
    if (currentUser) {
      if (!description.trim()) {
        Alert.alert("Missing data", "Missing a description", [{ text: "OK" }]);
        return;
      }
      
      if (!dueDate.getTime() || !dueDate.getDay()) {
        Alert.alert("Missing data", "Missing day and time", [{ text: "OK" }]);
        return;
      }
      try {
        const reminder = {
          description: description,
          date: dueDate.toISOString(),
        };

        const userRef = doc(db, "user", currentUser.uid);
        const petRef = doc(userRef, "pets", props.petId);
        const remindersRef = collection(petRef, "reminders");

        await addDoc(remindersRef, reminder);
       
        Alert.alert("Alert!", "Reminder Succesfully Added!", [
          { text: "OK", style: "cancel" },
        ]);
        setDescription("");
        setDueDate(new Date());
        
      } catch (err) {
        console.error("Error adding reminder:", err);
      }
    } else {
      console.log("No user is logged in.");
    }
    setShowDatePicker(false);
    setShowTimePicker(false);
    setDescription("");
    props.onClose();
  };

 const handleDateChange = (
  event: DateTimePickerEvent,
  selectedDate: Date | undefined
) => {
  // Check if the user has confirmed the date selection
  if (event.type === "set") {
    const currentDate = selectedDate || dueDate; // Use selected date or fallback to dueDate
    
    setShowTimePicker(true); // Open the time picker

    // Check if the current date is valid before setting it
    if (currentDate) {
      console.log("Selected date:", currentDate);
      setDueDate(currentDate); // Store the selected date in state
    } else {
      console.log("No valid date selected");
    }
  } else if (event.type === "dismissed") {
    // If the date picker is dismissed, close it
    setShowDatePicker(true);
  }
};

const handleTimeChange = (
  event: DateTimePickerEvent,
  time?: Date | undefined
) => {
  // Check if the user has confirmed the time selection
  if (event.type === "set") {
    const selectedTime = time || dueDate; // Use selected time or fallback to dueDate
    const newDate = new Date(dueDate); // Create a new date object based on the dueDate
    newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes()); // Set hours and minutes

    console.log("New due date and time:", newDate);
    setDueDate(newDate); // Update dueDate state with the new date and time
    setShowTimePicker(true);
    setShowDatePicker(true);
    
    
  }
};
  return (
   <Modal visible={props.isVisible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            placeholder="Enter reminder description"
            returnKeyType="done" 
            
          />
          <Text style={styles.title}>Due Date</Text>
          <Button title="Select Due Date" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="calendar"
             
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.title}>Due Time</Text>
          <Button title="Select Due Time" onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              
              value={dueDate}
              mode="time"
              display="clock"
              is24Hour={true}
              onChange={handleTimeChange}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button title="Add Reminder" onPress={addUserData} color="#4CAF50" />
            <Button title="Cancel" onPress={props.onClose} color="#f44336" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background
  },
  modalContainer: {
    width: '80%', // Make the modal smaller
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
