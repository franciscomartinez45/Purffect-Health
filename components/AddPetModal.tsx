import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import loginStyles from "./styles/loginRegister";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig.js";

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddPetModal = (props: AddPetModalProps) => {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const { currentUser } = getAuth();
  const addPet = async () => {
    if (currentUser) {
      if (!petName.trim()) {
        Alert.alert("Missing data", "Missing a description", [{ text: "OK" }]);
        return;
      }
      if (!age || !weight) {
        Alert.alert("Missing data", "Missing day and time", [{ text: "OK" }]);
        return;
      }
      try {
        const reminder = {
          name: petName,
          age: age,
          weight: weight,
        };

        const userRef = doc(db, "user", currentUser.uid);
        const PetsRef = collection(userRef, "pets");

        await addDoc(PetsRef, reminder);
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

  //   const addPet(){}
  const handleAddPet = () => {
    addPet();
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Pet</Text>

          <TextInput
            placeholder="Pet Name"
            value={petName}
            onChangeText={setPetName}
            style={loginStyles.input}
            placeholderTextColor={"black"}
          />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            style={loginStyles.input}
            keyboardType="numeric"
            placeholderTextColor={"black"}
          />
          <TextInput
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            style={loginStyles.input}
            keyboardType="numeric"
            placeholderTextColor={"black"}
          />

          <View style={styles.buttonContainer}>
            <Button title="Add Pet" onPress={handleAddPet} />
            <Button title="Cancel" onPress={props.onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    height: "90%",
    alignContent: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
