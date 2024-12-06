import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  loginStyles,
  primary,
  profileSettings,
  showPetsStyle,
} from "../components/styles/styles";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig.js";
import * as ImagePicker from "expo-image-picker";
import { petProfileStyle } from "../components/styles/styles";
import { IconSymbol } from "../components/ui/IconSymbol";
import { PetProfileModalProps } from "./PetProfileModal";

export default function EditPetInfo(props: PetProfileModalProps) {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const { currentUser } = getAuth();
  const [image, setImage] = useState<string | null>(null);

  const editPetData = async () => {
    if (currentUser) {
      const PetUpdate = {
        name: props.pet.name,
        age: props.pet.age,
        weight: props.pet.weight,
        uri: props.pet.uri,
      };
      if (petName && petName !== props.pet.name) {
        PetUpdate.name = petName;
      }
      if (age && age !== props.pet.age) {
        PetUpdate.age = age;
      }
      if (weight && weight !== props.pet.weight) {
        PetUpdate.weight = weight;
      }
      if (image && image !== props.pet.uri) {
        PetUpdate.uri = image;
      }

      try {
        const userRef = doc(db, "user", currentUser.uid);
        const PetsRef = doc(userRef, "pets", props.pet.id);
        await updateDoc(PetsRef, PetUpdate);

        props.onClose();
      } catch (err) {
        console.error("Error adding pet:", err);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleEditPetData = () => {
    editPetData();
    setImage(null);
    setPetName("");
    setWeight("");
    setAge("");
  };

  return (
    <Modal visible={props.visible} animationType="slide" transparent>
      <View style={petProfileStyle.modalAddContainer}>
        <View style={petProfileStyle.modalContent}>
          <Text style={petProfileStyle.headerText}>
            {props.pet.name}'s Information
          </Text>

          {image ? (
            <View style={petProfileStyle.imageView}>
              <View style={petProfileStyle.circleProfileButton}>
                <Image
                  source={{ uri: image }}
                  style={showPetsStyle.imageProfile}
                  resizeMode="cover"
                />
              </View>
            </View>
          ) : (
            <View style={petProfileStyle.imageView}>
              <View style={petProfileStyle.circleProfileButton}>
                <Image
                  source={{ uri: props.pet.uri }}
                  style={showPetsStyle.imageProfile}
                  resizeMode="cover"
                />
              </View>
            </View>
          )}
          <Text style={profileSettings.label}>Name</Text>
          <TextInput
            placeholder={props.pet.name}
            value={petName}
            onChangeText={setPetName}
            style={profileSettings.input}
            returnKeyType="done"
            returnKeyLabel="Done"
            autoCorrect={false}
            placeholderTextColor={"#D3D3D3"}
          />
          <Text style={profileSettings.label}>Age(Years):</Text>
          <TextInput
            placeholder={props.pet.age}
            value={age}
            onChangeText={setAge}
            style={profileSettings.input}
            keyboardType="numeric"
            returnKeyType="done"
            autoCorrect={false}
            placeholderTextColor={"#D3D3D3"}
          />
          <Text style={profileSettings.label}>Weight(lbs):</Text>
          <TextInput
            placeholder={props.pet.weight}
            value={weight}
            onChangeText={setWeight}
            style={profileSettings.input}
            keyboardType="numeric"
            returnKeyType="done"
            autoCorrect={false}
            placeholderTextColor={"#D3D3D3"}
          />
          <View style={petProfileStyle.buttonContainer}>
            <TouchableOpacity
              style={loginStyles.submitButton}
              onPress={pickImage}
            >
              <IconSymbol
                size={20}
                name="square.and.arrow.up"
                color={primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={loginStyles.submitButton}
              onPress={handleEditPetData}
            >
              <Text style={loginStyles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginStyles.buttonCancel}
              onPress={props.onClose}
            >
              <Text style={loginStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
