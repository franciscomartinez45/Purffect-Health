import React, { useState } from "react";
import { TextInput, Text, Button, Alert,  Modal, View, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { loginStyles, petProfileStyle } from "./styles/styles";


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
        date: dueDate.toLocaleString(), 
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
    setShowDatePicker(true);
    setShowTimePicker(true);
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
  if (event.type === "set" && time) {
    const newDate = new Date(dueDate);
    newDate.setHours(time.getHours(), time.getMinutes());
    setDueDate(newDate);
    setShowTimePicker(true);
    setShowDatePicker(true);
  }
};


const handleOnClose = ()=>{
  setDescription("");
  props.onClose();
}
  return (
   <Modal visible={props.isVisible} animationType="slide" transparent>
      <View style={petProfileStyle.modalBackground}>
        <View style={petProfileStyle.modalContainer}>
          <Text style={petProfileStyle.title}>Description</Text>
          <TextInput
            style={petProfileStyle.input}
            onChangeText={setDescription}
            placeholder="Walk, Feed, Bathe, Vet appt, etc."
            returnKeyType="done" 
            placeholderTextColor={"#666"}
          />
          <View style = {petProfileStyle.buttonProfileContainer}>
            <TouchableOpacity style = {loginStyles.addButton} onPress={() => setShowDatePicker(true)}><Text>Select Due Date</Text></TouchableOpacity> 
         
           
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              
            />
          )}
          </View>
           <View style = {petProfileStyle.buttonProfileContainer}>
          <TouchableOpacity style = {loginStyles.addButton} onPress={() => setShowTimePicker(true)}><Text>Select Due Time</Text></TouchableOpacity> 

          {showTimePicker && (
            <DateTimePicker
              value={dueDate}
              mode="time"
              display="clock"
              is24Hour={true}
              onChange={handleTimeChange}
            />
          )}
          </View>
          <View style={petProfileStyle.buttonProfileContainer}>
            <TouchableOpacity style = {loginStyles.button} onPress={addUserData}><Text>Add Reminder</Text></TouchableOpacity> 
            <TouchableOpacity style = {loginStyles.buttonCancel} onPress={handleOnClose} ><Text>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

