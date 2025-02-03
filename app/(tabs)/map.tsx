import React, { useState, useEffect } from "react";
import { Platform, TouchableOpacity, View, Text, FlatList } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Constants from "expo-constants";
import { locationsStyle } from "@/components/styles/styles";

export default function MapScreen() {
  const [locations, setLocations] = useState<any[] | []>([]);
  const [latitude, setLatude] = useState<number>(37.78825);
  const [longitude, setLongitude] = useState<number>(-122.4324);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (Platform.OS === "ios") {
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
                radius: 3000,
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
    }
  }, [latitude, longitude]);

  return (
    <View>
      {Platform.OS === "web" && (
        <Text>
          Thank you for visiting this part. Find care nearby has not be
          implemented for web, only for iOS
        </Text>
      )}

      {Platform.OS === "ios" && (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.place_id}
          contentContainerStyle={locationsStyle.remindersListContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.place_id} onPress={() => {}}>
              <View style={locationsStyle.itemContainer}>
                <Text style={locationsStyle.name}>{item.name}</Text>

                <Text style={locationsStyle.status}>
                  Status: {item.business_status || "N/A"}
                </Text>

                <Text style={locationsStyle.vicinity}>
                  Address: {item.vicinity}
                </Text>

                {item.opening_hours ? (
                  <Text style={locationsStyle.openingHours}>Open</Text>
                ) : (
                  <Text style={locationsStyle.closedHours}>Closed</Text>
                )}

                <View style={locationsStyle.separator} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
