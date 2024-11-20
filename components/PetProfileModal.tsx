import React, { useState } from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { AddReminder } from "./AddReminder";
import { PetReminders } from "./Reminders";
import { Pet } from "@/components/PetProfiles";
import { petProfileStyle, showPetsStyle } from "./styles/styles";
import { loginStyles } from "./styles/styles";

interface PetProfileModalProps {
  visible: boolean;
  onClose: () => void;
  pet: Pet;
}

export const PetProfileModal = (props: PetProfileModalProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOnPress = () => {
    setModalVisible(true);
  };
  const handleOnClose = () => {
    setModalVisible(false);
  };
  return (
    <Modal visible={props.visible} animationType="slide" transparent>
      <View style={petProfileStyle.modalBackground}>
        <View style={petProfileStyle.modalPetProfileContainer}>
          <View style={petProfileStyle.profileHeader}>
            <View style={petProfileStyle.circleProfileButton}>
              {props.pet.uri ? (
                <Image
                  source={{ uri: props.pet.uri }}
                  style={showPetsStyle.imageProfile}
                  resizeMode="cover"
                />
              ) : (
                <></>
              )}
            </View>
            <View style={petProfileStyle.petInfo}>
              <Text style={petProfileStyle.petName}>{props.pet.name}</Text>
              <Text style={petProfileStyle.petDetails}>
                Weight: {props.pet.weight} lbs
              </Text>
              <Text style={petProfileStyle.petDetails}>
                Age: {props.pet.age} years
              </Text>
            </View>
          </View>
          <PetReminders petId={props.pet.id}></PetReminders>

          <View style={petProfileStyle.buttonProfileContainer}>
            <TouchableOpacity
              style={loginStyles.button}
              onPress={handleOnPress}
            >
              <Text style={loginStyles.buttonText}>Add Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginStyles.buttonCancel}
              onPress={props.onClose}
            >
              <Text style={loginStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <AddReminder
            isVisible={modalVisible}
            petId={props.pet.id}
            onClose={handleOnClose}
          ></AddReminder>
        </View>
      </View>
    </Modal>
  );
};
