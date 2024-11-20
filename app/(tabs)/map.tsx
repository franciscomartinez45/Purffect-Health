import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function App() {
  const [locations, setLocations] = useState<any[] | []>([]);
  const [latitude, setLatude] = useState<number>(37.78825);
  const [longitude, setLongitude] = useState<number>(-122.4324);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLatude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 500,
              type: "fast-food",
              key: "AIzaSyDMbL1B8Itr9z61KzsOS0bur77I6yOu2bg",
            },
          }
        );
        if (response.data.results) {
          setLocations(response.data.results);
          console.log(locations);
        }
      } catch (Error) {
        console.log(Error);
      }
    }

    getCurrentLocation();
  }, []);

  return (
    <MapView
      style={styles.container}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title="Your Location"
        pinColor="blue"
      />

      {locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: location.geometry.location.lat,
            longitude: location.geometry.location.lng,
          }}
          title={location.name}
          description={location.vicinity}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    width: 500,
    height: 900,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
