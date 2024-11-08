import React, { useState } from "react";
import { TextInput, Text, Button, Alert, StyleSheet, Modal, View, Keyboard } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { styles } from "./styles/styles";


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
  
  if (event.type === "set") {
    const currentDate = selectedDate || dueDate; 
    
    setShowTimePicker(true); 

   
    if (currentDate) {
      console.log("Selected date:", currentDate);
      setDueDate(currentDate); 
    } else {
      console.log("No valid date selected");
    }
  } else if (event.type === "dismissed") {
   
    setShowDatePicker(true);
  }
};

const handleTimeChange = (
  event: DateTimePickerEvent,
  time?: Date | undefined
) => {
  
  if (event.type === "dismissed") {
    const selectedTime = time || dueDate; 
    const newDate = new Date(dueDate); 
    newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes()); 

    
    setDueDate(newDate); 
    setShowTimePicker(false);
    setShowDatePicker(false);
    
    
  }

};

const handleOnClose = ()=>{
  setDescription("");
  props.onClose();
}
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
          {dueDate&&(<Text>{dueDate.toISOString().split('T')[0]}</Text>)}
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
            <Button title="Cancel" onPress={handleOnClose} color="#f44336" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

