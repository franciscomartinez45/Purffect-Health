import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface RoundButtonProps {
  onPress: () => void; // Define onPress as a prop
}

const RoundButton: React.FC<RoundButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60, // Width of the button
    height: 60, // Height of the button
    borderRadius: 30, // Make it round
    backgroundColor: "#007BFF", // Button color
    alignItems: "center", // Center icon horizontally
    justifyContent: "center", // Center icon vertically
    position: "absolute", // To position it freely
    bottom: 90, // Increase this value to move the button up from the bottom
    right: 30, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3, 
    zIndex: 10, 
  },
});

export default RoundButton;
