import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BackToHomeButton from './BackToHomeButton'; 

const PUBLIC_SAFETY_NUMBER = 'tel:5152712222'; 

const TimerScreen = ({ navigation }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [countdown, setCountdown] = useState(0); // in seconds
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startCountdown = (duration) => {
    setRemaining(duration);
    setCountdown(duration);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          showCallPrompt();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setRemaining(0);
  };

  const handleTimePicked = (date) => {
    const minutes = date.getHours();
    const seconds = date.getMinutes();
    const duration = (minutes * 60) + seconds;
    setPickerVisible(false);
    if (duration > 0) {
      startCountdown(duration);
    }
  };

  const showCallPrompt = () => {
    Alert.alert(
      'Safety Check',
      'Time is up! Do you want to call Public Safety?',
      [
        {
          text: 'No',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => Linking.openURL(PUBLIC_SAFETY_NUMBER),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const renderTimer = () => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const fill = countdown > 0 ? ((countdown - remaining) / countdown) * 100 : 0;

  return (
    <View style={styles.container}>
      <BackToHomeButton />
      <Text style={styles.title}>Safety Timer</Text>
      <Text style={styles.instructions}>
        Set your estimated time to reach your destination. When the timer ends,
        you'll be asked if you want to call Public Safety.
      </Text>

      {!isRunning ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.buttonText}>Set Minutes & Seconds</Text>
        </TouchableOpacity>
      ) : (
        <>
          <AnimatedCircularProgress
            size={220}
            width={15}
            fill={fill}
            tintColor="#0077cc"
            backgroundColor="#d9d9d9"
            rotation={0}
            style={{ marginVertical: 20 }}
          >
            {() => (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{renderTimer()}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <TouchableOpacity style={styles.stopButton} onPress={stopCountdown}>
            <Text style={styles.stopButtonText}>Stop Timer</Text>
          </TouchableOpacity>
        </>
      )}

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        display="spinner"
        onConfirm={handleTimePicked}
        onCancel={() => setPickerVisible(false)}
        is24Hour={true}
        date={new Date(0, 0, 0, 5, 0, 0)}
        minuteInterval={1}
      />
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0077cc',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  timerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: '#003366',
    fontSize: 36,
    fontWeight: 'bold',
  },
  stopButton: {
    marginTop: 20,
    backgroundColor: '#cc0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
