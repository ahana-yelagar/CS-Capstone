import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationMapScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 41.60207526066948,
    longitude: -93.65686560476307,
  });

  const handleDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const locationData = { latitude, longitude };
    setLocation({ latitude, longitude });
    console.log('New location:', latitude, longitude);
    saveData('location', JSON.stringify(locationData));
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(`Failed to save ${key}`, e);
    }
  };

  return (
    <View style={styles.mapContainer}>
      <View style={styles.info}>
        <Text style={styles.welcomeText}>
          Drag the Marker to the Incident Location.
        </Text>
        <Text style={styles.subtitle}>
          Tap and Hold on the Marker to Drag.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate('ReportScreen');
          }}
        >
          <Text style={styles.submitButtonText}>Submit Location</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.6031,
          longitude: -93.6546,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="hybrid"
      >
        <Marker
          coordinate={location}
          draggable
          onDragEnd={handleDragEnd}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { flex: 1 },
  map: {
    flex: 1,
    width: '100%',
    height: '80%',
  },
  info: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10, // Add space between title and subtitle
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10, // Add spacing above and below the button
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

