import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Pet } from "./PetProfiles";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import {
  indexStyles,
  loginStyles,
  petProfileStyle,
  reminderStyles,
} from "./styles/styles";
import { IconSymbol } from "./ui/IconSymbol";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export const EditPets = (props: ModalProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPet, setPet] = useState<Pet | null>(null);
  const [pets, setReminders] = useState<Pet[]>([]);
  const { currentUser } = getAuth();

  const getPets = () => {
    if (currentUser) {
      try {
        const petsRef = collection(db, "user", currentUser.uid, "pets");
        const unsubscribe = onSnapshot(petsRef, (snapshot) => {
          const petList: Pet[] = [];
          snapshot.forEach((doc) => {
            petList.push({
              id: doc.id,
              name: doc.data().name,
              weight: doc.data().weight,
              age: doc.data().age,
              uri: doc.data().uri,
            });
          });
          setReminders(petList);
        });
        return unsubscribe;
      } catch (err) {
        console.error("Error fetching reminders:", err);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = getPets();
    return () => unsubscribe && unsubscribe();
  }, []);

  const deletePet = async (petId: string) => {
    if (currentUser) {
      try {
        const reminderRef = doc(db, "user", currentUser.uid, "pets", petId);
        await deleteDoc(reminderRef);
        Alert.alert("Pet deleted successfully");
      } catch (err) {
        console.error("Error deleting pet:", err);
        Alert.alert("Error deleting pet");
      }
    }
  };

  const handleDeletePet = (petId: string) => {
    Alert.alert(
      "Delete Pet",
      "Are you sure you want to delete this pet?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deletePet(petId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Modal visible={props.visible} animationType="slide" transparent>
      <View style={petProfileStyle.modalBackground}>
        <View style={petProfileStyle.modalPetProfileContainer}>
          <Text style={indexStyles.welcomeText}>Edit Your Pets</Text>
          <Text style={indexStyles.smallText}>
            One stop destination for your pet needs
          </Text>
          <FlatList
            data={pets}
            keyExtractor={(item) => item.id}
            contentContainerStyle={reminderStyles.remindersListContent}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <View style={reminderStyles.reminderItem} key={item.id}>
                <Text style={reminderStyles.reminderDescription}>
                  Name: {item.name}
                </Text>
                <Text style={reminderStyles.reminderDate}>Age: {item.age}</Text>
                <Text style={reminderStyles.reminderId}>
                  Weight: {item.weight}
                </Text>
                <TouchableOpacity
                  style={reminderStyles.deleteButton}
                  onPress={() => handleDeletePet(item.id)}
                >
                  <IconSymbol
                    size={25}
                    name="minus.circle.fill"
                    color={"red"}
                  />
                </TouchableOpacity>
              </View>
            )}
            style={reminderStyles.flatList}
          />

          <TouchableOpacity
            style={loginStyles.buttonCancel}
            onPress={props.onClose}
          >
            <Text style={loginStyles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
