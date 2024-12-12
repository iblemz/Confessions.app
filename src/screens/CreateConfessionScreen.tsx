import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { createConfession } from '../utils/db';
import { useNavigation } from '@react-navigation/native';

export default function CreateConfessionScreen() {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter your confession');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please login to submit a confession');
      return;
    }

    setLoading(true);
    try {
      await createConfession({
        userId: user.uid,
        type: 'text', // For now, only supporting text confessions
        content: content.trim(),
        isAnonymous,
      });

      Alert.alert(
        'Success',
        'Your confession has been submitted',
        [
          {
            text: 'OK',
            onPress: () => {
              setContent('');
              navigation.navigate('Latest');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to submit confession');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please login to submit a confession</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AuthTab', { screen: 'Login' })}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Create Confession</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Write your confession here..."
          placeholderTextColor="#666"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Submit Anonymously</Text>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: '#1E1E1E', true: '#BB86FC' }}
            thumbColor={isAnonymous ? '#3700B3' : '#999'}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={styles.buttonText}>Submit Confession</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    color: '#BB86FC',
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    color: '#E1E1E1',
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
  },
  textArea: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 5,
    color: '#E1E1E1',
    marginBottom: 20,
    minHeight: 200,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    color: '#E1E1E1',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
