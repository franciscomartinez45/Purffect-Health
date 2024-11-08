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
import { styles } from "./styles/styles";
import { loginStyles } from "./styles/styles";
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
        <View style={styles.modalPetProfileContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.circleProfileButton}>
              {props.pet.uri ? ( 
                <Image
                  source={{ uri: props.pet.uri }} 
                  style={styles.imageProfile}
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
              <TouchableOpacity style={loginStyles.button} onPress={handleOnPress}>
               <Text style={loginStyles.buttonText}>Add Reminder</Text>
                   </TouchableOpacity>
     
      
           
            
            <TouchableOpacity style={loginStyles.buttonCancel}
            onPress={props.onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          
          </View>
            <AddReminder isVisible={modalVisible} petId={props.pet.id} onClose={handleOnClose}></AddReminder>
        </View>
      </View>
    </Modal>
  );
};

