import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8", // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff", // White background for input
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#007BFF", // Blue button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text color
    fontWeight: "bold",
  },
  roundButton: {
    width: 70, // Width of the button
    height: 70, // Height of the button
    borderRadius: 40, // Make it round
    backgroundColor: "#007BFF", // Button color
    alignItems: "center", // Center icon horizontally
    justifyContent: "center", // Center icon vertically
    position: "absolute", // To position it freely
    bottom: 70, // Distance from bottom of the screen
    right: 30, // Distance from right of the screen
    elevation: 5, // Add shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
    zIndex: 10, // Ensure button is above other components
  },
});

export default loginStyles;
