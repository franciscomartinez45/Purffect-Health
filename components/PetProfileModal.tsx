import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import {AddReminder} from "./AddReminder";
import { PetReminders } from "./Reminders";

interface PetProfileModalProps {
  visible: boolean;
  onClose: () => void;
  petId: string;
}

export const PetProfileModal= (props: PetProfileModalProps) => {
  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Pet Reminder</Text>
          <AddReminder petId={props.petId} />
          <PetReminders petId={props.petId} />
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={props.onClose} color="red" />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  
  buttonContainer: {
    position: "absolute", // Keep the button fixed at the bottom right
    bottom: 20,
    right: 20,
  },
});
