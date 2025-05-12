import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './Styles/styles.js'; //adding a comment
import { Linking } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleCall = () => {
    Linking.openURL('tel:5152712222'); 
  };

  return (
    <ImageBackground 
      source={require('./Styles/background.jpg')} 
      style={styles.background}
      blurRadius={5} // Adds blur effect
    >
      <View style={styles.container}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.tagline}>Your safety, our priority.</Text>
        </View>

        {/* Emergency Call Button */}
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.loginButtonText}>Emergency Help</Text>
        </TouchableOpacity>

        {/* Feature Buttons */}
        <View style={styles.featureButtonsContainer}>
          <TouchableOpacity 
            style={styles.featureButton} 
            onPress={() => navigation.navigate('MapScreen')}
          >
            <Text style={styles.featureButtonText}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton} 
            onPress={() => navigation.navigate('ReportScreen')}
          >
            <Text style={styles.featureButtonText}>Report</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton} 
            onPress={() => navigation.navigate('TimerScreen')}
          >
            <Text style={styles.featureButtonText}>Set a Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton} 
            onPress={() => navigation.navigate('ChaperoneFeature')}
          >
            <Text style={styles.featureButtonText}>Safe Walk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
