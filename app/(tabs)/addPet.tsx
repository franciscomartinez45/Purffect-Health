import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  loginStyles,
  primary,
  profileSettings,
  showPetsStyle,
} from "../../components/styles/styles";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig.js";
import * as ImagePicker from "expo-image-picker";
import { petProfileStyle } from "../../components/styles/styles";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { useRouter } from "expo-router";

export default function AddPet() {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const { currentUser } = getAuth();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const addPet = async () => {
    if (currentUser) {
      if (!petName.trim()) {
        Alert.alert("Missing data", "Missing a description", [{ text: "OK" }]);
        return;
      }
      if (!age || !weight) {
        Alert.alert("Missing data", "Age or Weight not specified", [
          { text: "OK" },
        ]);
        return;
      }

      if (!image) {
        Alert.alert("Missing data", "Pet picture is requires, please retry", [
          { text: "OK" },
        ]);
        return;
      }

      try {
        const Pet = {
          name: petName,
          age: age,
          weight: weight,
          uri: image,
        };
        const userRef = doc(db, "user", currentUser.uid);
        const PetsRef = collection(userRef, "pets");
        await addDoc(PetsRef, Pet);
        Alert.alert("Success!", "Pet  Succesfully Added!", [
          { text: "OK", style: "cancel" },
        ]);
        router.push("/(tabs)");
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

  const handleAddPet = () => {
    addPet();
    setImage(null);
    setPetName("");
    setWeight("");
    setAge("");
  };

  return (
    <View style={petProfileStyle.modalAddContainer}>
      <View style={petProfileStyle.modalContent}>
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
          <Text style={petProfileStyle.modalTitle}>Add New Pet</Text>
        )}
        <Text style={profileSettings.label}>First Name</Text>
        <TextInput
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
          style={profileSettings.input}
          placeholderTextColor={"black"}
          returnKeyType="done"
          returnKeyLabel="Done"
        />
        <Text style={profileSettings.label}>Age:</Text>
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={profileSettings.input}
          keyboardType="numeric"
          placeholderTextColor={"black"}
          returnKeyType="done"
        />
        <Text style={profileSettings.label}>Weight:</Text>
        <TextInput
          placeholder="Weight"
          value={weight}
          onChangeText={setWeight}
          style={profileSettings.input}
          keyboardType="numeric"
          returnKeyType="done"
          placeholderTextColor={"black"}
        />
        <View style={petProfileStyle.buttonContainer}>
          <TouchableOpacity
            style={loginStyles.submitButton}
            onPress={pickImage}
          >
            <Text style={loginStyles.buttonText}>
              <IconSymbol
                size={20}
                name="square.and.arrow.up"
                color={primary}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={loginStyles.submitButton}
            onPress={handleAddPet}
          >
            <Text style={loginStyles.buttonText}>Add Pet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
