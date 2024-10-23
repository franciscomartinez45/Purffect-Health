import React, { useState } from "react";
import { TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import loginStyles from "./styles/loginRegister";
interface AddReminderProps {
  petId: string;
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
        setShowDatePicker(false);
        setShowTimePicker(false);
        setDescription("");
        Alert.alert("Alert!", "Reminder Succesfully Added!", [
          { text: "OK", style: "cancel" },
        ]);
      } catch (err) {
        console.error("Error adding reminder:", err);
      }
    } else {
      console.log("No user is logged in.");
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (event.type == "set") {
      const currentDate = selectedDate || dueDate;
      setShowDatePicker(true);
      setShowTimePicker(true);

      if (!currentDate.getTime()) {
        setDueDate(currentDate);
      }
    }
  };
  const handleTimeChange = (
    event: DateTimePickerEvent,
    time?: Date | undefined
  ) => {
    if (event.type === "set") {
      const selectedTime = time || dueDate;
      setShowTimePicker(true);
      const newDate = new Date(dueDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDueDate(newDate);
      if (!newDate.getDay()) {
        setShowDatePicker(true);
      }
    }
  };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Description</Text>
      <TextInput
        style={loginStyles.input}
        onChangeText={(text) => setDescription(text)}
      />
      <Text style={styles.title}>Due Date</Text>
      <Button title="Select Due Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dueDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.title}>Due Time</Text>
      <Button title="Select Due Time" onPress={() => setShowTimePicker(true)} />

      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={dueDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Button title="Add data" onPress={() => addUserData()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: "auto",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 5,
  },
  lists: {
    width: "80%",
    borderColor: "red",
    borderWidth: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
});
