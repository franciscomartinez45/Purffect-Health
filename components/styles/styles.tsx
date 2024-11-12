import { Dimensions, StyleSheet } from "react-native";
export const primary = "#ffffff";
export const textColor = "black"
export const buttonPrimary = "#F4F0DB";
export const textInputColor = "#ffffff";
export const headerBackground = "#ffffff";
export const tabBottomColor = "#ffffff";

export const showPetsStyle = StyleSheet.create({
   container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    padding: 0,
    
  },
   circleButton: {
    width: 130, 
    height: 130, 
    borderRadius: 60, 
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  imageProfile: {
    width: '100%', 
    height: '100%', 
    },
})
export const petProfileStyle = StyleSheet.create({
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
 
  profileButton: {
    width: '30%', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
 
  initial: {
    fontSize: 24, 
    color: '#fff',
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
    borderRadius: 40, 
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
    marginTop: 'auto', 
    paddingVertical: 20,
  },
  
  closeButton: {
    backgroundColor: '#f44336', 
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
  modalButtons:{
    borderColor:"black",
    width:"100%",
    
    flex:1,
    borderWidth:5,
    
  }
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
export const calendarStyle = StyleSheet.create({
  calendar:{

  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
},

}
)
export const calendarModalStyle = StyleSheet.create({
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    width:"auto",
    backgroundColor: buttonPrimary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: textColor,
    fontWeight: 'thin',
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
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: primary, 
    color: textColor
  },
  title: {
    fontSize: 18,
    fontWeight: "thin",
    marginBottom: 20,
    textAlign: "center",
  },
  welcomeText:{
    fontSize:40,
    fontWeight:"bold",
    margin:20,
    textAlign:"center",
  },

  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: textInputColor, 
    shadowRadius:5,
    shadowOpacity:5
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: buttonPrimary, 
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderColor:"black",
    borderWidth:1
  },
  buttonText: {
    color:textColor,
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: '#f44336', 
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});
export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary, 
    padding: 20, 
    color: textColor
  },
  content: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
  },
  welcomeText:{
    fontSize:50
  },
  smallText:{
    fontSize:18
  },
  welcomeContainer:{
    borderBottomColor:"black",
    borderBottomWidth:1
  }
});
