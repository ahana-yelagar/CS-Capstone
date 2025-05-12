import BackToHomeButton from './BackToHomeButton';
import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Platform, Switch, TouchableOpacity, ScrollView, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { styles } from './Styles/styles.js';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as L from "expo-location"; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// debugging axios posts and using async storage inspired from:
// https://chatgpt.com/share/6802cf17-6808-800e-b036-a972d9d0c3e6


export default function ReportScreen() {
  const [name, setName] = useState('');
  const [FormType, setFormType] = useState('Report');
  const [IncidentType, setIncidentType] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  // const [deviceLocation, setdeviceLocation] = useState(false);
  // const[latitude, setLatitude] = useState();
  // const[longitude, setLongitude] = useState();
  // const LocationSwitch = () => setdeviceLocation(previousState => !previousState);
  const [locationDesc, setLocationDescription] = useState('');
  const [weapon, setWeapon] = useState(false);
  const [weaponDesc, setWeaponDesc] = useState('');
  const [incidentDescription, setincidentDescription] = useState('');
  const [perpDescription, setPerpDescription] = useState('');
  const [victim, setVictim] = useState(false);
  const [victimDescription, setVictimDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [incidentDate, setIncidentDate] = useState('');
  const [pickerMode, setPickerMode] = useState('date');
  const navigation = useNavigation();

  // const VictimSwitch = () => setVictim(prev => !prev);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(`Failed to save ${key}`, e);
    }
  };

  const loadData = async (key, setter, parseJson = false) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setter(parseJson ? JSON.parse(value) : value);
      }
    } catch (e) {
      console.error(`Failed to load ${key}`, e);
    }
  };

  useEffect(() => {
    loadData('name', setName);
    loadData('email', setEmail);
    loadData('type', setFormType);
    loadData('incident', setIncidentType);
    loadData('location', setLocation, true);
    loadData('locationDesc', setLocationDescription);
    loadData('incidentDesc', setincidentDescription);
    loadData('perpDesc', setPerpDescription);
    loadData('victim', setVictim);
    loadData('victimDesc', setVictimDescription);
    loadData('incidentType', setIncidentType);
    loadData('weapon', setWeapon);
    loadData('weaponDesc', setWeaponDesc);
    loadData('date', setIncidentDate);
  }, []);


  const handlePickerChange = (event, selected) => {
    if (event.type === 'set' && selected) {
      if (pickerMode === 'date') {
        const currentTime = incidentDate ? new Date(incidentDate) : new Date();
        const newDate = new Date(selected);
        newDate.setHours(currentTime.getHours());
        newDate.setMinutes(currentTime.getMinutes());
        setIncidentDate(newDate);
        saveData("date", newDate.toLocaleString())
        setPickerMode('time');
      } else if (pickerMode === 'time') {
        const currentDate = incidentDate ? new Date(incidentDate) : new Date();
        currentDate.setHours(selected.getHours());
        currentDate.setMinutes(selected.getMinutes());
        setIncidentDate(currentDate);
        saveData("date", currentDate.toLocaleString());
        setDatePickerVisibility(false);
      }
    } else {
      setDatePickerVisibility(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://3.145.90.231:80/report', {
        Name: name,
        Type: FormType,
        Incident: IncidentType,
        Email: email,
        Location: location,
        LocationDesc: locationDesc,
        Weapon: weapon,
        WeaponDesc: weaponDesc,
        IncidentDesc: incidentDescription,
        PerpDesc: perpDescription,
        Victim: victim,
        VictimDesc: victimDescription,
        Date: incidentDate,
        });

      if (response.status === 200) {
        Alert.alert('Success', 'Submitted successfully!');
        AsyncStorage.clear()
        navigation.navigate('HomeScreen'); // Redirect to map or home screen
      }
    } 
    catch (error) {
      console.error('Submission Error:', error);
      Alert.alert('Error', 'Report Submission Failed. Please try again.');
    }
  };

  //   code adapted from: https://www.geeksforgeeks.org/create-a-location-sharing-app-using-react-native/
  const fetchLocation = async () => { 
    await L.requestForegroundPermissionsAsync(); 

    const { 
      coords: { latitude, longitude }, 
    } = await L.getCurrentPositionAsync(); 
    const locationData = { latitude, longitude };
    setLocation({ latitude, longitude });
    saveData("location", JSON.stringify(locationData));

    // Show an alert when the location is updated 
    Alert.alert("Location Updated", `Lat: ${latitude}, Lon: ${longitude}`, [ 
      { 
        text: "Close", 
        onPress: () => console.log("Close Pressed"), 
        style: "destructive", 
      }, 
    ]); 
  }; 
    

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.background} edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
              >
              <ScrollView contentContainerStyle={styles.formContainer}>
            
                <Text style={styles.title}>File a Report/Tip</Text>
                <Text style={styles.subtitle}>Your information is confidential.</Text>

                <Text style={styles.label}>Report Type</Text>
                <Picker
                  selectedValue={FormType}
                  onValueChange= {(value) => {
                    setFormType(value);
                    saveData('type', value);
                  }}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Incident Report" value="Report" />
                  <Picker.Item label="Anonymous Tip" value="Tip" />
                </Picker>

                {FormType === "Report" && (
                  <>
                    <Text style={styles.label}>Your Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="First Last"
                      placeholderTextColor="#ccc"
                      value={name}
                      onChangeText={(text) => {
                          setName(text);
                          saveData('name', text);
                      }}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="first.last@drake.edu"
                      placeholderTextColor="#ccc"
                      value={email}
                      onChangeText={(text) => {
                          setEmail(text);
                          saveData('email', text);
                      }}
                    />
                  </>
                )}

                <Text style={styles.label}>Incident Type</Text>
                <Picker
                  selectedValue={IncidentType}
                  onValueChange={(value) => {
                      setIncidentType(value);
                      saveData('incident', value);
                    }}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Abuse / Assault" value="Abuse/Assault" />
                  <Picker.Item label="Disturbance" value="Disturbance" />
                  <Picker.Item label="Harassment / Stalking" value="Harassment / Stalking" />
                  <Picker.Item label="Suspicious Activity" value="Suspicious Activity" />
                  <Picker.Item label="Theft" value="Theft" />
                  <Picker.Item label="Vandalism" value="Vandalism" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>

                <Text style={styles.label}>Location</Text>
                  <View>
                          <TouchableOpacity style={styles.loginButton} onPress={fetchLocation}>
                              <Text style={styles.loginButtonText}>Use Device Location</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LocationMapScreen')}>
                              <Text style={styles.loginButtonText}>Select Location on the Map</Text>
                          </TouchableOpacity>
                          {location.latitude && location.longitude ? (
                              <Text>
                              Latitude: {location.latitude}, Longitude: {location.longitude}
                              </Text>
                          ) : (
                              <Text>No location available</Text>
                          )}
                      </View>
                  
                  {/* {deviceLocation === false && (
                    <View>
                      <TextInput
                        style={styles.input}
                        placeholder= {location}
                        placeholderTextColor="#ccc"
                        value={location}
                        onChangeText={(text) => {
                                setLocation(text);
                                saveData('location', text);
                            }}
                      />
                    </View>
                  )} */}
                <Text style={styles.label}>Location Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder="More details here..."
                  placeholderTextColor="#ccc"
                  value={locationDesc}
                  onChangeText={(text) => {
                          setLocationDescription(text);
                          saveData('locationDesc', text);
                      }}
                />

                <Text style={styles.label}>Was a Weapon Involved?</Text>
                <Switch
                  value={weapon}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={weapon ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => {
                    setWeapon(value);
                    saveData('weapon', value.toString());
                  }}            
                />

                {weapon && (
                  <>
                    <Text style={styles.label}>Describe the Weapon</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Description"
                      placeholderTextColor="#ccc"
                      value={weaponDesc}
                      onChangeText={(text) => {
                          setWeaponDesc(text);
                          saveData('weaponDesc', text);
                      }}
                      multiline
                    />
                  </>
                )}

                <Text style={styles.label}>Describe the Incident</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor="#ccc"
                  value={incidentDescription}
                  onChangeText={(text) => {
                          setincidentDescription(text);
                          saveData('incidentDesc', text);
                      }}
                  multiline
                />

                <Text style={styles.label}>Describe the Perpetrator</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor="#ccc"
                  value={perpDescription}
                  onChangeText={(text) => {
                          setPerpDescription(text);
                          saveData('perpDesc', text);
                      }}
                  multiline
                />

                <Text style={styles.label}>Were you the victim?</Text>
                <Switch
                  value={victim}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={victim ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => {
                    setVictim(value);
                    saveData('victim', value.toString());
                  }} 
                />

                {!victim && (
                  <>
                    <Text style={styles.label}>Describe the Victim</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Description"
                      placeholderTextColor="#ccc"
                      value={victimDescription}
                      onChangeText={(text) => {
                          setVictimDescription(text);
                          saveData('victimDesc', text);
                      }}
                      multiline
                    />
                  </>
                )}

                <Text style={styles.label}>Pick a Date</Text>
                <TouchableOpacity onPress={() => {
                  setPickerMode('date');
                  setDatePickerVisibility(true);
                }}>
                  <TextInput
                    style={styles.input}
                    placeholder="📅 Select Date and Time ⏱️"
                    placeholderTextColor="#ccc"
                    value={incidentDate ? moment(incidentDate).format('DD MMMM, YYYY - h:mm A') : ''}
                    editable={false}
                  />
                </TouchableOpacity>

                {isDatePickerVisible && Platform.OS === 'android' && (
                  <DateTimePicker
                    value={incidentDate ? new Date(incidentDate) : new Date()}
                    mode={pickerMode}
                    display="default"
                    maximumDate={pickerMode === 'date' ? moment().subtract(0, 'days').toDate() : undefined}
                    onChange={handlePickerChange}
                  />
                )}

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>

        <BackToHomeButton /> 
              </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </TouchableWithoutFeedback>
  );
}
