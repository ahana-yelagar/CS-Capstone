import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { styles } from './Styles/styles.js';


export default function LoginScreen() {
  const [usernameInput, setUsername] = useState('');
  const [passwordInput, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {

      const response = await axios.post('http://3.145.90.231:80/login', {
        username: usernameInput, 
        password: passwordInput, 

        });

      if (response.status === 200) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('HomeScreen'); // Redirect to map or home screen
      }
    } 
    catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#003366', '#00509E']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={usernameInput}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={passwordInput}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.forgotPasswordText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

