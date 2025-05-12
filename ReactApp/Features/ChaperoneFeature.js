import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import BackToHomeButton from './BackToHomeButton';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { styles } from './Styles/styles.js';

export default function ChaperoneRequestScreen() {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState(new Date(Date.now() + 15 * 60000)); // Default to 15 min from now
  const [notes, setNotes] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestStatus, setRequestStatus] = useState(''); // For tracking request status
  const [statusScreen, setStatusScreen] = useState(false);
  const [statusStep, setStatusStep] = useState(0);

  // Predefined campus locations for destination picker
  const campusLocations = [
    { label: 'Select destination...', value: '' },
    { label: 'Olmsted Center', value: 'Olmsted Center' },
    { label: 'Goodwin-Kirk Residence Hall', value: 'Goodwin-Kirk Residence Hall' },
    { label: 'Cowles Library', value: 'Cowles Library' },
    { label: 'Helmick Commons', value: 'Helmick Commons' },
    { label: 'Hubbell Dining Hall', value: 'Hubbell Dining Hall' },
    { label: 'Meredith Hall', value: 'Meredith Hall' },
    { label: 'Morehouse Residence Hall', value: 'Morehouse Residence Hall' },
    { label: 'Jewett Residence Hall', value: 'Jewett Residence Hall' },
    { label: 'Stalnaker Residence Hall', value: 'Stalnaker Residence Hall' },
    { label: 'Carpenter Residence Hall', value: 'Carpenter Residence Hall' },
    { label: 'Crawford Residence Hall', value: 'Crawford Residence Hall' },
    { label: 'Herriott Residence Hall', value: 'Herriott Residence Hall' },
    { label: 'Quad Creek Cafe', value: 'Quad Creek Cafe' },
    { label: 'Knapp Center', value: 'Knapp Center' },
    { label: 'Bell Center', value: 'Bell Center' },
    { label: 'Harvey Ingham Hall', value: 'Harvey Ingham Hall' },
    { label: 'Olin Hall', value: 'Olin Hall' },
    { label: 'Collier-Scripps Hall', value: 'Collier-Scripps Hall' },
    { label: 'Science Connector Building', value: 'Science Connector Building' },
    { label: 'Fine Arts Center', value: 'Fine Arts Center' },
    { label: 'Aliber Hall', value: 'Aliber Hall' },
    { label: 'Drake West Village', value: 'Drake West Village' },
    { label: 'Other (specify in notes)', value: 'Other' }
  ];

  // Status steps for the tracker
  const statusSteps = [
    'Request Sent',
    'Officer Assigned',
    'On The Way',
    'Arrived',
    'Completed'
  ];

  useEffect(() => {
    fetchLocation();
  }, []);

  // Get user's current location
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to request a chaperone.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      // For a real app, you might reverse geocode here to get address
      setCurrentLocation(`Lat: ${location.coords.latitude.toFixed(6)}, Long: ${location.coords.longitude.toFixed(6)}`);
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Location Error', 'Unable to determine your current location.');
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      // Ensure the time is in the future
      const currentTime = new Date();
      if (selectedTime < currentTime) {
        Alert.alert('Invalid Time', 'Please select a future time for your departure.');
        return;
      }
      setDepartureTime(selectedTime);
    }
  };

  const showConfirmation = () => {
    // Validate inputs
    if (!destination) {
      Alert.alert('Missing Information', 'Please select your destination.');
      return;
    }
    
    // Show confirmation modal
    setModalVisible(true);
  };

  const submitRequest = () => {
    setModalVisible(false);
    
    // In a real app, you would send this data to your backend
    // For now, we'll simulate a successful submission
    setStatusScreen(true);
    setRequestStatus('Request sent successfully!');
    setStatusStep(0);
    
    // Simulate status updates for demonstration
    simulateStatusUpdates();
  };

  // This function simulates status updates - replace with real API calls
  const simulateStatusUpdates = () => {
    setTimeout(() => {
      setStatusStep(1); // Chaperone assigned
      setRequestStatus('Officer Johnson has been assigned as your chaperone.');
    }, 5000);
    
    setTimeout(() => {
      setStatusStep(2); // On the way
      setRequestStatus('Officer Johnson is on the way to your location.');
    }, 10000);
    
    setTimeout(() => {
      setStatusStep(3); // Arrived
      setRequestStatus('Officer Johnson has arrived at your location.');
    }, 15000);
  };

  const cancelRequest = () => {
    if (statusScreen) {
      // Confirm cancellation of active request
      Alert.alert(
        'Cancel Request',
        'Are you sure you want to cancel your Safe Walk request?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setStatusScreen(false);
              setRequestStatus('');
              setStatusStep(0);
              Alert.alert('Request Cancelled', 'Your Safe Walk request has been cancelled.');
            },
          },
        ]
      );
    } else {
      // Just close the modal
      setModalVisible(false);
    }
  };

  const completeRequest = () => {
    // This would be triggered when the chaperone service is complete
    setStatusStep(4); // Completed
    setRequestStatus('Safe Walk service completed. Thank you for using Drake Safe Walk!');
    
    // After 3 seconds, return to request form
    setTimeout(() => {
      setStatusScreen(false);
      setRequestStatus('');
      setStatusStep(0);
      // Reset form
      setDestination('');
      setNotes('');
      setDepartureTime(new Date(Date.now() + 15 * 60000));
    }, 3000);
  };

  // Render request status screen
  if (statusScreen) {
    return (
        <View style={[styles.container, { backgroundColor: '#003366', flex: 1 }]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.title}>Safe Walk Request Status</Text>
          
          <View style={styles.statusTracker}>
            {statusSteps.map((step, index) => (
              <View key={index} style={styles.statusStepContainer}>
                <View style={[
                  styles.statusCircle,
                  index <= statusStep ? styles.activeStatusCircle : {}
                ]}>
                  <Text style={styles.statusCircleText}>{index + 1}</Text>
                </View>
                <Text style={[
                  styles.statusText,
                  index <= statusStep ? styles.activeStatusText : {}
                ]}>
                  {step}
                </Text>
                {index < statusSteps.length - 1 && (
                  <View style={[
                    styles.statusLine,
                    index < statusStep ? styles.activeStatusLine : {}
                  ]} />
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.statusMessageBox}>
            <Text style={styles.statusMessage}>{requestStatus}</Text>
          </View>
          
          <View style={styles.requestDetails}>
            <Text style={styles.detailLabel}>From:</Text>
            <Text style={styles.detailText}>{currentLocation}</Text>
            
            <Text style={styles.detailLabel}>To:</Text>
            <Text style={styles.detailText}>{destination}</Text>
            
            <Text style={styles.detailLabel}>Departure Time:</Text>
            <Text style={styles.detailText}>{moment(departureTime).format('h:mm A')}</Text>
            
            {notes ? (
              <>
                <Text style={styles.detailLabel}>Notes:</Text>
                <Text style={styles.detailText}>{notes}</Text>
              </>
            ) : null}
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelRequest}>
              <Text style={styles.buttonText}>Cancel Request</Text>
            </TouchableOpacity>
            
            {statusStep === 3 && (
              <TouchableOpacity style={styles.completeButton} onPress={completeRequest}>
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <BackToHomeButton />
      </SafeAreaView>
      </View>
    );
  }

  // Render request form
  return (
    <View style={[styles.container, { backgroundColor: '#003366', flex: 1 }]}>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Request a Safe Walk </Text>
        <Text style={styles.subtitle}>Drake Public Safety Will Escort You Safely To Your Destination</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Current Location</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{currentLocation || 'Detecting location...'}</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchLocation}>
              <Text style={styles.refreshButtonText}>🔄</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.label}>Destination</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={destination}
              onValueChange={(value) => setDestination(value)}
              style={styles.picker}
            >
              {campusLocations.map((location) => (
                <Picker.Item 
                  key={location.value} 
                  label={location.label} 
                  value={location.value} 
                />
              ))}
            </Picker>
          </View>
          
          <Text style={styles.label}>Estimated Departure Time</Text>
          <TouchableOpacity 
            style={styles.timePickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timePickerText}>
              {moment(departureTime).format('h:mm A')}
            </Text>
          </TouchableOpacity>
          
          {showTimePicker && (
            <DateTimePicker
              value={departureTime}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={handleTimeChange}
            />
          )}
          
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any additional information..."
            placeholderTextColor="#999"
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            numberOfLines={4}
          />
          
          <TouchableOpacity 
            style={styles.requestButton}
            onPress={showConfirmation}
          >
            <Text style={styles.buttonText}>Request A Safe Walk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Safe Walk Request</Text>
            
            <View style={styles.modalDetails}>
              <Text style={styles.modalLabel}>From:</Text>
              <Text style={styles.modalText}>{currentLocation}</Text>
              
              <Text style={styles.modalLabel}>To:</Text>
              <Text style={styles.modalText}>{destination}</Text>
              
              <Text style={styles.modalLabel}>When:</Text>
              <Text style={styles.modalText}>{moment(departureTime).format('h:mm A')}</Text>
              
              {notes ? (
                <>
                  <Text style={styles.modalLabel}>Notes:</Text>
                  <Text style={styles.modalText}>{notes}</Text>
                </>
              ) : null}
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelModalButton} onPress={cancelRequest}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.confirmButton} onPress={submitRequest}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <BackToHomeButton />
    </SafeAreaView>
    </View>
  );
}