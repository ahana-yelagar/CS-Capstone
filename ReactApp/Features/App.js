import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ReportScreen from './ReportScreen';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import TimerScreen from './TimerScreen';
import LocationMapScreen from './LocationMap';
import ChaperoneRequestScreen from './ChaperoneFeature';

const Stack = createStackNavigator(); // 

export default function App() {
  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared on startup');
      } catch (e) {
        console.error('Failed to clear AsyncStorage:', e);
      }
    };

    clearStorage();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />

		    <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ headerShown: false }} />

        <Stack.Screen name="TimerScreen" component={TimerScreen} options={{ headerShown: false }} />

        <Stack.Screen name="LocationMapScreen" component={LocationMapScreen} options={{ headerShown: false }} />

        <Stack.Screen name="ChaperoneFeature" component={ChaperoneRequestScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

