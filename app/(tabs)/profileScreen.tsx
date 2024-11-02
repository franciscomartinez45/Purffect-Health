import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Alert,  Button,  StyleSheet } from "react-native";
import { db } from "../../firebaseConfig";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";


interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}


export default function TabTwoScreen() {


  const { currentUser } = getAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
 

  const getUserData = async () => {
    if (currentUser) {
      const profileData = await getDoc(doc(db, "user", currentUser.uid));
      if (profileData.exists()) {
        setUserData(profileData.data() as UserData);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Name: {userData?.firstName}</Text>
      <Text style={styles.title}>Last Name: {userData?.lastName}</Text>
      <Text style={styles.title}>Email: {userData?.email}</Text>
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});


