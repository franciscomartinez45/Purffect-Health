import React, { useState } from "react";
import {
  TextInput,
  Text,
  Button,
  Alert,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { loginStyles, petProfileStyle, primary } from "./styles/styles";

interface AddReminderProps {
  petId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const AddReminder = (props: AddReminderProps) => {
  const { currentUser } = getAuth();
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [dueTime, setDueTime] = useState<Date | null>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [description, setDescription] = useState<string>("");

  const addUserData = async () => {
    if (currentUser) {
      if (!description.trim()) {
        Alert.alert("Missing data", "Missing a description", [{ text: "OK" }]);
        return;
      }

      if (!dueDate || !dueTime) {
        Alert.alert("Missing data", "Missing date or time", [{ text: "OK" }]);
        return;
      }
      try {
        const reminder = {
          description: description,
          date: dueDate.toLocaleDateString(),
          time: dueTime.toLocaleTimeString(),
        };
        const userRef = doc(db, "user", currentUser.uid);
        const petRef = doc(userRef, "pets", props.petId);
        const remindersRef = collection(petRef, "reminders");

        await addDoc(remindersRef, reminder);

        Alert.alert("Alert!", "Reminder Successfully Added!", [
          { text: "OK", style: "cancel" },
        ]);
        setDescription("");
        setDueDate(null);
        setDueTime(null);
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
    setDescription("");
    setDueDate(null);
    setDueTime(null);
    props.onClose();
  };

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
          {dueDate && <Text>Selected Date is:</Text>}
          <TouchableOpacity
            style={loginStyles.addButton}
            onPress={showDatePicker}
          >
            {!dueDate ? (
              <Text>Select Date</Text>
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
          {dueTime && <Text>Selected Time is:</Text>}
          <TouchableOpacity
            style={loginStyles.addButton}
            onPress={showTimePicker}
          >
            {!dueTime ? (
              <Text>Select Time</Text>
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
