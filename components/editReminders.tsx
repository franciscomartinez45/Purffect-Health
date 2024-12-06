import React, { useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAuth } from "firebase/auth";
import { loginStyles, petProfileStyle } from "./styles/styles";
import { Reminder } from "./Reminders";
import { db } from "@/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

interface EditReminderProps {
  reminder: Reminder;
  isVisible: boolean;
  onClose: () => void;
  petId: string;
}

export const EditReminder = (props: EditReminderProps) => {
  const { currentUser } = getAuth();
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [dueTime, setDueTime] = useState<Date | null>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [description, setDescription] = useState<string>("");

  const addUserData = async () => {
    if (currentUser) {
      try {
        const reminderUpdate = {
          description: props.reminder.description,
          date: props.reminder.date,
          time: props.reminder.time,
        };
        if (dueDate && dueDate.toLocaleDateString() !== props.reminder.date) {
          reminderUpdate.date = dueDate.toLocaleDateString();
        }
        if (dueTime && dueTime.toLocaleTimeString() !== props.reminder.time) {
          reminderUpdate.time = dueTime.toLocaleTimeString();
        }
        if (description && description !== props.reminder.description) {
          reminderUpdate.description = description;
        }
        const userRef = doc(db, "user", currentUser.uid);
        const petRef = doc(userRef, "pets", props.petId);
        const reminderRef = doc(petRef, "reminders", props.reminder.id);
        await setDoc(reminderRef, reminderUpdate, { merge: true });

        Alert.alert("Alert!", "Reminder Successfully Saved!", [
          { text: "OK", style: "cancel" },
        ]);
        props.onClose();
      } catch (err) {
        console.error("Error adding reminder:", err);
      }
    }
    props.onClose();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const handleConfirmDate = (date: Date) => {
    setDueDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setDueTime(time);
    setTimePickerVisibility(false);
  };

  const handleOnClose = () => {
    setDatePickerVisibility(false);
    setTimePickerVisibility(false);
    setDueDate(null);
    setDueTime(null);
    props.onClose();
  };

  return (
    <Modal visible={props.isVisible} animationType="slide" transparent>
      <View style={petProfileStyle.modalBackground}>
        <View style={petProfileStyle.modalContainer}>
          <Text style={petProfileStyle.title}>Edit Reminder</Text>
          <TextInput
            style={petProfileStyle.input}
            onChangeText={setDescription}
            placeholder={props.reminder.description}
            returnKeyType="done"
            placeholderTextColor={"#D3D3D3"}
          />
          {props.reminder.date && <Text>Current Due Date is:</Text>}
          <TouchableOpacity
            style={loginStyles.addButton}
            onPress={showDatePicker}
          >
            {!dueDate ? (
              <Text>{props.reminder.date}</Text>
            ) : (
              <Text>{dueDate.toLocaleDateString()}</Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisibility(false)}
          />
          {props.reminder.time && <Text>Selected Time is:</Text>}
          <TouchableOpacity
            style={loginStyles.addButton}
            onPress={showTimePicker}
          >
            {!dueTime ? (
              <Text>{props.reminder.time}</Text>
            ) : (
              <Text>{dueTime.toLocaleTimeString()}</Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={() => setTimePickerVisibility(false)}
          />

          <View style={petProfileStyle.buttonProfileContainer}>
            <TouchableOpacity style={loginStyles.button} onPress={addUserData}>
              <Text style={loginStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginStyles.buttonCancel}
              onPress={handleOnClose}
            >
              <Text style={loginStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
