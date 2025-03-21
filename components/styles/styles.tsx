import { StyleSheet } from "react-native";
export const primary = "#ffffff";
export const textColor = "#F4F0DB";
export const buttonPrimary = "#444444";
export const textInputColor = "#ffffff";
export const headerBackground = "#ffffff";
export const tabBottomColor = "#ffffff";

export const showPetsStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circleButton: {
    width: 130,
    height: 130,
    borderRadius: 60,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  imageProfile: {
    width: "100%",
    height: "100%",
  },
});
export const petProfileStyle = StyleSheet.create({
  reminderList: {
    marginTop: 20,
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  reminderText: {
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  modalAddContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  modalContent: {
    width: "90%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    height: "70%",
    justifyContent: "center",
    alignContent: "center",
  },
  modalTitle: {
    fontSize: 45,
    fontWeight: "200",
    marginBottom: 20,
    textAlign: "center",
  },
  inputAdd: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    paddingVertical: 5,
  },
  buttonContainerAdd: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "50%",
    paddingBottom: 25,
  },

  profileButton: {
    width: "30%",
    alignItems: "center",
    marginBottom: 10,
  },

  initial: {
    fontSize: 24,
    color: "#fff",
  },
  modalPetProfileBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  imagePetProfile: {
    width: "100%",
    height: "100%",
  },
  modalPetProfileContainer: {
    width: "95%",
    height: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 15,
    width: "100%",
    height: "auto",
  },
  circleProfileButton: {
    width: 150,
    height: 150,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  petInfo: {
    flex: 1,
    paddingBottom: 0,
  },
  petName: {
    fontSize: 35,
    fontWeight: "600",
    color: "#333",
  },
  petDetails: {
    fontSize: 16,
    color: "#666",
  },
  buttonProfileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto",
    paddingVertical: 20,
    color: primary,
  },

  closeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    color: primary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    borderColor: "black",
    width: "100%",
    flex: 1,
    borderWidth: 5,
  },
  imageView: {
    alignContent: "center",
    justifyContent: "space-between",
    left: "28%",
    bottom: 10,
  },
  headerText: {
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    top: 10,
    fontSize: 25,
    fontWeight: 200,
    left: 60,
  },
});

export const reminderStyles = StyleSheet.create({
  remindersListContent: {
    padding: 20,
  },
  flatList: {
    width: "100%",
  },
  reminderItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  reminderDescription: {
    fontSize: 25,
    fontWeight: "200",
    color: "#2c3e50",
  },
  reminderDate: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  reminderTime: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  reminderId: {
    fontSize: 12,
    color: "#bdc3c7",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
export const calendarStyle = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: primary,
  },
});
export const calendarModalStyle = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  remindersList: {
    maxHeight: 200,
    width: "100%",
  },
  reminderText: {
    fontSize: 16,
    marginVertical: 5,
  },
  noRemindersText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    width: "auto",
    backgroundColor: buttonPrimary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: textColor,
    fontWeight: "thin",
  },
});
export const mapStyles = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    height: 900,
  },
});
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: primary,
    color: textColor,
  },
  title: {
    fontSize: 18,
    fontWeight: "thin",
    marginBottom: 20,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: textInputColor,
    shadowRadius: 2,
    shadowOpacity: 5,
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: buttonPrimary,
    padding: 15,
    color: primary,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: textColor,
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: "#f44336",
    color: primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButton: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: buttonPrimary,
    padding: 15,
    color: primary,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});
export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    padding: 20,
    color: textColor,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    padding: 10,
  },
  welcomeText: {
    fontSize: 55,
    marginBottom: 10,
    fontWeight: "200",
  },
  smallTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    justifyContent: "space-between",
  },
  smallText: {
    fontSize: 22,
    fontWeight: "100",
  },

  penButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedText: {
    paddingTop: 540,
    fontSize: 15,
    paddingLeft: 50,
  },
});

export const profileSettings = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: "300",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
  },
});
export const locationsStyle = StyleSheet.create({
  remindersListContent: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  vicinity: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  openingHours: {
    fontSize: 14,
    color: "#008000",
    marginVertical: 4,
  },
  closedHours: {
    fontSize: 14,
    color: "red",
    marginVertical: 4,
  },
  types: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  plusCode: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  reference: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  placeId: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
  },
});
