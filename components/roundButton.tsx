import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface RoundButtonProps {
  onPress: () => void; // Define onPress as a prop
}

export const RoundButton = (props:RoundButtonProps) => {
  return (
    <TouchableOpacity style={roundButton.button} onPress={props.onPress}>
      <Icon name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const roundButton = StyleSheet.create({
  button: {
    width: 80, 
    height: 80, 
    borderRadius: 50,
    backgroundColor: "#007BFF", 
    alignItems: "center", 
    justifyContent: "center", 
    position: "absolute",
    bottom: 20, 
    right: 30, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3, 
    zIndex: 10, 
  },
});


