import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { styles } from './Styles/styles.js';

export default function RegisterScreen() {
  const [firstNameInput, setFirstName] = useState('');
  const [lastNameInput, setLastName] = useState('');
  const [idNumberInput, setID] = useState('');
  const [emailInput, setEmail] = useState('');
  const [usernameInput, setUsername] = useState('');
  const [passwordInput, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    console.log('Register button pressed');
    // console.log('Response:', response.status, response.data);
    try {
      console.log('Sending POST request to the server...');
      const response = await axios.post('http://3.145.90.231:80/register', {

        username: usernameInput, 
        password: passwordInput, 
        // firstName: firstName, 
        // lastName: lastName, 
        // idNumber: idNumber, 
        // email: emailInpupt
      });

      console.log('Response:', response);
      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('LoginScreen'); // Redirect to login
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Registration failed. Try again.');
    }
  };

  return (
    <LinearGradient colors={['#003366', '#00509E']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Create an Account</Text>
          <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#999" value={firstNameInput} onChangeText={setFirstName} />
          <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#999" value={lastNameInput} onChangeText={setLastName} />
          <TextInput style={styles.input} placeholder="ID Number" placeholderTextColor="#999" value={idNumberInput} onChangeText={setID} />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" value={emailInput} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999" value={usernameInput} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" value={passwordInput} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

