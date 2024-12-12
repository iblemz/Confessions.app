import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function RecordConfession() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);

      // Start timer
      const intervalId = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      setTimer(intervalId);

      setIsRecording(true);
    } catch (err) {
      Alert.alert('Failed to start recording', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      // Stop timer
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }

      setIsRecording(false);
      setRecordingTime(0);

      if (uri) {
        Alert.alert('Recording saved', `Your confession has been saved at: ${uri}`);
      }
    } catch (err) {
      Alert.alert('Failed to stop recording', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.recordingInfo}>
        <Text style={styles.recordingTimeText}>
          {isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Ready to record'}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={toggleRecording} 
        style={[
          styles.recordButton,
          isRecording && styles.recordingActive
        ]}
      >
        <Ionicons
          name={isRecording ? 'stop' : 'mic'}
          size={48}
          color={isRecording ? '#FF4136' : '#BB86FC'}
        />
      </TouchableOpacity>
      <Text style={styles.instructionText}>
        {isRecording
          ? 'Tap to stop recording'
          : 'Tap the microphone to start recording your confession'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  recordingInfo: {
    marginBottom: 20,
  },
  recordingTimeText: {
    color: '#E1E1E1',
    fontSize: 18,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordingActive: {
    backgroundColor: '#2E1E1E',
    borderColor: '#FF4136',
    borderWidth: 2,
  },
  instructionText: {
    color: '#757575',
    fontSize: 16,
    textAlign: 'center',
  },
});
