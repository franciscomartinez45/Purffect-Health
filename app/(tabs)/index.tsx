import {AddPetModal} from "../../components/AddPetModal"
import { ShowPets } from "@/app/(tabs)/Profiles";
import RoundButton from "@/components/styles/roundButton";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function TabOneScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddPet = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ShowPets />
      <RoundButton onPress={handleAddPet} />
      <AddPetModal visible={isModalVisible} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Set your desired background color
    padding: 20, // Optional padding
  },
  content: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally (optional)
  },
});
