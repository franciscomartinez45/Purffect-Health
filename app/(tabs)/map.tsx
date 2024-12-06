import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Constants from "expo-constants";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function MapScreen() {
  const [locations, setLocations] = useState<any[] | []>([]);
  const [latitude, setLatude] = useState<number>(37.78825);
  const [longitude, setLongitude] = useState<number>(-122.4324);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (Error) {
        console.log(Error);
      }
    }
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 4000,
              type: "veterinary_care",
              key: Constants.manifest2?.extra?.expoClient?.extra
                ?.GOOGLE_API_KEY,
            },
          }
        );

        if (response.data.results) {
          const filteredLocations = response.data.results.filter(
            (place: { types: string[] }) =>
              place.types && place.types.includes("veterinary_care")
          );
          setLocations(filteredLocations);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
    getCurrentLocation();
  }, [latitude, longitude]);

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.05,
      }}
    >
      <Marker coordinate={{ latitude, longitude }} title="Current Location">
        <IconSymbol name="location.north.fill" size={30} color="blue" />
      </Marker>
      {locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: location.geometry.location.lat,
            longitude: location.geometry.location.lng,
          }}
          title={location.name}
          description={location.vicinity}
        >
          <IconSymbol name="mappin.circle.fill" size={30} color="red" />
        </Marker>
      ))}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    height: 900,
  },
});
