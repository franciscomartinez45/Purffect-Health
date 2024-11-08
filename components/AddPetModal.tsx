import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { loginStyles } from "./styles/styles";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig.js";
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./styles/styles";
interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddPetModal = (props: AddPetModalProps) => {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const { currentUser } = getAuth();
 const [image, setImage] = useState<string | null>(null);
  const addPet = async () => {
    if (currentUser) {
      
      if (!petName.trim()) {
        Alert.alert("Missing data", "Missing a description", [{ text: "OK" }]);
        return;
      }
      if (!age || !weight) {
        Alert.alert("Missing data", "Age or Weight not specified", [{ text: "OK" }]);
        return;
      }
      
      if (!image){
      Alert.alert("Missing data", "Pet picture is requires, please retry", [{ text: "OK" }]);
        return;
    }
   
      try {
        const reminder = {
          name: petName,
          age: age,
          weight: weight,
          uri: image
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
    } 
  };


  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

   

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddPet = () => {
    
    addPet();
    setImage(null);
    setPetName("");
    setWeight("");
    setAge("");
    props.onClose();
  };
  const handleOnClose = ()=>{
    setImage(null);
    setPetName("");
    setWeight("");
    setAge("");
    props.onClose();
  }

  return (
   <Modal visible={props.visible} animationType="slide" transparent={true}>
      <View style={styles.modalAddContainer}>
        <View style={styles.modalContent}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Text style={styles.modalTitle}>Add New Pet</Text>

          <TextInput
            placeholder="Pet Name"
            value={petName}
            onChangeText={setPetName}
            style={loginStyles.input}
            placeholderTextColor={"black"}
            returnKeyType="done"
            returnKeyLabel="Done"
          />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            style={loginStyles.input}
            keyboardType="numeric"
            placeholderTextColor={"black"}
             returnKeyType="done"
          />
          <TextInput
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            style={loginStyles.input}
            keyboardType="numeric"
            returnKeyType="done"
            placeholderTextColor={"black"}

          />

           <Button title="Pick an image from camera roll" onPress={pickImage} />
        

          

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={loginStyles.button} onPress={handleAddPet}>
        <Text style={loginStyles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={loginStyles.buttonCancel} onPress={handleOnClose}>
        <Text style={loginStyles.buttonText}>Cancel</Text>
      </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



