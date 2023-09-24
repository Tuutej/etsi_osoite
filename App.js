import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { API_TOKEN } from "@env";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const response = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/address?key=${API_TOKEN}&location=${keyword}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      setLocation(data.results[0]);
    } else {
      setLocation(null);
      Alert.alert("Location not found");
    }
  };

  return (
    <View>
      <MapView
        style={{ flex: 1, paddingTop: 530 }}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        {location?.locations?.length > 0 && (
          <Marker
            coordinate={{
              latitude: location.locations[0].latLng.lat,
              longitude: location.locations[0].latLng.lng,
            }}
            title={location.providedLocation.location}
          />
        )}
      </MapView>

      <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder="Enter a location"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Find" onPress={getLocation} />
    </View>
  );
}
