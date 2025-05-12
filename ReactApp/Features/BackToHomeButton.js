// BackToHomeButton.js
import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackToHomeButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.backButton}
      onPress={() => navigation.navigate('HomeScreen')}
    >
      <Text style={styles.homeIcon}>🏠</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#F7CA18', // Mustard yellow color
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 100,
  },
  homeIcon: {
    fontSize: 20,
  }
});

export default BackToHomeButton;