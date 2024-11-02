import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  
  TouchableOpacity,
} from "react-native";
import {AddReminder} from "./AddReminder";
import { PetReminders } from "./Reminders";
import { Pet } from "@/components/PetProfiles";

interface PetProfileModalProps {
  visible: boolean;
  onClose: () => void;
  pet: Pet;
}

export const PetProfileModal= (props: PetProfileModalProps) => {
  const [modalVisible,setModalVisible] = useState<boolean>(false);
  
  const handleOnPress = () => {
    setModalVisible(true);
  }
  const handleOnClose=()=>{
    setModalVisible(false);
  }
  return (
  <Modal visible={props.visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.circleButton}>
              {props.pet.uri ? ( // Check if there is a pet image
                <Image
                  source={{ uri: props.pet.uri }} // Use the image URI
                  style={styles.image}
                  resizeMode="cover"
                />
              ):(<></>)}
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{props.pet.name}</Text>
              <Text style={styles.petDetails}>Weight: {props.pet.weight} kg</Text>
              <Text style={styles.petDetails}>Age: {props.pet.age} years</Text>
              
            </View>
          </View>
          <PetReminders petId={props.pet.id}></PetReminders>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleOnPress} >
              <Text style={styles.buttonText}>Add Reminder</Text>
            </TouchableOpacity>
            <AddReminder isVisible={modalVisible} petId={props.pet.id} onClose={handleOnClose}></AddReminder>
            <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for better focus
  },
  image: {
    width: '100%', // Make the image fill the circle
    height: '100%', // Make the image fill the circle
    },
  modalContainer: {
    width: '95%',
    height: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 10, // Strong shadow for a floating effect
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
    width: '100%',
  },
   circleButton: {
    width: 150, // Set the desired size
    height: 150, // Set the desired size
    borderRadius: 80, // Make it circular
    overflow: 'hidden', // Hide overflow to make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  petInfo: {
    flex: 1,
    paddingBottom:0,
  },
  petName: {
    fontSize: 35,
    fontWeight: '600',
    color: '#333',
    
  },
  petDetails: {
    fontSize: 16,
    color: '#666',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto', // Pushes buttons to the bottom of the modal
    paddingVertical: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50', // Green for positive action
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#f44336', // Red for cancel action
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});