import React, { useState, useEffect} from 'react';
import MapView, { Marker, Callout  } from 'react-native-maps';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Modal, Pressable  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importing navigation hook
import BackToHomeButton from './BackToHomeButton'; // Import the BackToHomeButton
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;



export default function MapScreen() {
  const navigation = useNavigation(); // Access the navigation object
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://3.145.90.231:80/reports');
        setReports(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleMarkerPress = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.6031,
          longitude: -93.6546,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        mapType='hybrid'
      >

        {reports.map((report, index) => {
          const lat = parseFloat(report.latitude);
          const lng = parseFloat(report.longitude);

          // Skip if either lat or lng is null, undefined, or not a number
          if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) {
            return null;
          }

          return (
            <Marker
              key={index}
              coordinate={{ latitude: lat, longitude: lng }}
              // title={report.Incident || 'Incident'}
              onPress={() => handleMarkerPress(report)}
              // description={
              // 'Location: ${report.LocationDesc} \n Time: ${report.Date}'
              //   }
            >
            
            {/* <CustomCallout report={report} /> */}
            </Marker>
          );
        })}

      </MapView>
      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedReport && (() => {
              const reportDateTime = new Date(selectedReport.Time || selectedReport.Date);
              const date = reportDateTime.toLocaleDateString();
              const time = reportDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const weapon = selectedReport.Weapon == 1 ? "Armed" : "None Reported";

              return (
                <>
                  <Text style={styles.modalTitle}>{selectedReport.Incident}</Text>
                  <Text style={{ color: 'white' }}>Location: {selectedReport.LocationDesc || 'Unknown'}</Text>
                  <Text style={{ color: 'white' }}>Weapon: {weapon}</Text>
                  <Text style={{ color: 'white' }}>Date: {date}</Text>
                  <Text style={{ color: 'white' }}>Time: {time}</Text>

                  {/* ✅ Move close button inside this return block */}
                  <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={{ color: 'black' }}>Close</Text>
                  </Pressable>
                </>
              );
            })()}
          </View>
        </View>
      </Modal>

      {/* Always show BackToHomeButton in top right */}
      <BackToHomeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { flex: 1 },
  map: { flex: 1, width: '100%' },
  homeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#003366',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', 
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#fac919',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
});