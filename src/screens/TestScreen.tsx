import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { testFirebaseConnection } from '../utils/firebaseTest';

export default function TestScreen() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const result = await testFirebaseConnection();
      setTestResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setTestResult(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={runTest}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test Firebase Connection'}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultContainer}>
        <Text style={styles.resultText}>{testResult}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  button: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 10,
  },
  resultText: {
    color: '#E1E1E1',
    fontFamily: 'monospace',
  },
});
