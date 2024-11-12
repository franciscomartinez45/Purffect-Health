import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { search } from '@/serpService'; 
import { mapStyles } from '@/components/styles/styles';

export default function profileScreen() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [region, setRegion] = useState({
    latitude: 33.827820,
    longitude: -118.272346,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const location = '@33.827820,-118.272346,14z'; 
      const data = await search(location);
      const results = (data?.local_results || []).sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
      setResults(results);
      setLoading(false);
    };

    fetchData();
  }, []);

    const openDirections = (latitude: number, longitude: number) => {
    const latitudeString = latitude.toString();
    const longitudeString = longitude.toString();
    const url = `http://maps.apple.com/?daddr=${latitudeString},${longitudeString}`;
    Linking.openURL(url).catch((err) => console.error(err));
  };

  const handleFlatListItemPress = (place: any) => {
    setSelectedPlace(place);
    setRegion({
      latitude: place.gps_coordinates.latitude,
      longitude: place.gps_coordinates.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  if (loading) {
    return (
      <View style={mapStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        region={region} 
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} 
      >
        {results.map((item) => (
          <Marker
            key={item.place_id}
            coordinate={{
              latitude: item.gps_coordinates.latitude,
              longitude: item.gps_coordinates.longitude,
            }}
            title={item.title}
            description={item.address}
            pinColor={selectedPlace?.place_id === item.place_id ? 'blue' : 'red'} 
            onPress={() => setSelectedPlace(item)} 
          >
            <Callout>
              <View style={mapStyles.calloutContainer}>
                <Text style={mapStyles.calloutTitle}>{item.title}</Text>
                <Text style={mapStyles.calloutText}>{item.address}</Text>
                <Text style={mapStyles.calloutText}>Rating: {item.rating} stars</Text>

                <TouchableOpacity
                  style={mapStyles.directionsButton}
                  onPress={() => openDirections(item.gps_coordinates.latitude, item.gps_coordinates.longitude)}
                >
                  <Text style={mapStyles.directionsButtonText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFlatListItemPress(item)}>
            <View style={mapStyles.resultItem}>
              <Text>{item.title}</Text>
              <Text>{item.address}</Text>
              <Text>{item.rating} stars</Text>
            </View>
          </TouchableOpacity>
        )}
        style={mapStyles.list}
      />
    </View>
  );
};

