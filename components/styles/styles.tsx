import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    //calendar
  calendarContainer: {
    flex: 1,
    padding: 10,
  },
  calendar: {
    width: '100%',
    height: 400,
  },
  reminderList: {
    marginTop: 20,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reminderText: {
    fontSize: 14,
  },
  noReminderText: {
    fontSize: 14,
    color: 'gray',
  },
   modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalContainer: {
    width: '80%', 
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

   modalAddContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    height: "90%",
    alignContent: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    paddingBottom:25,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Space the items evenly
    padding: 10,
  },
  profileButton: {
    width: '30%', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  circleButton: {
    width: 90, 
    height: 90, 
    borderRadius: 40, 
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 24, 
    color: '#fff',
  },
    imageProfile: {
    width: '100%', 
    height: '100%', 
    },
    modalPetProfileBackground: {
    
    
   
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  imagePetProfile: {
    width: '100%', 
    height: '100%', 
    },
  modalPetProfileContainer: {
    width: '95%',
    height: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection:"row-reverse",
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
    width: '100%',
    height:"auto"
    
  },
   circleProfileButton: {
    width: 150, 
    height: 150, 
    borderRadius: 80, 
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  petInfo: {
    flex: 1,
    paddingBottom:0,
  },
  petName: {
    fontSize: 35,
    fontWeight: '600',
    color: '#333',
    
  },
  petDetails: {
    fontSize: 16,
    color: '#666',
    
  },
  buttonProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto', // Pushes buttons to the bottom of the modal
    paddingVertical: 20,
  },
  
  closeButton: {
    backgroundColor: '#f44336', // Red for cancel action
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});


export const loginStyles = StyleSheet.create({
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
    backgroundColor: "#fff", 
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#007BFF", 
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: '#f44336', 
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", 
    fontWeight: "bold",
  },
  
});
export const reminderStyles = StyleSheet.create({
  remindersListContent: {
    padding: 20,
  },
  flatList: {
    width: '100%', 
  },
  reminderItem: {
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  reminderDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  reminderDate: {
    fontSize: 14,
    color: '#7f8c8d', 
  },
  reminderTime: {
    fontSize: 14,
    color: '#7f8c8d', 
  },
  reminderId: {
    fontSize: 12,
    color: '#bdc3c7', 
  },
});
export const calendarStyles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
  calendar: {
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  remindersList: {
    maxHeight: 200,
    width: '100%',
  },
  reminderText: {
    fontSize: 16,
    marginVertical: 5,
  },
  noRemindersText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export const mapStyles= StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5, 
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

 
  calloutContainer: {
    padding: 10,
    width: 200,
    alignItems: 'center',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calloutText: {
    fontSize: 14,
    marginVertical: 5,
  },
  directionsButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  directionsButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


