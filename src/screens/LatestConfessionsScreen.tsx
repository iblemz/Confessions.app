import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLatestConfessions } from '../utils/db';

// Mock data for confessions
const mockConfessions = [
  { id: '1', title: 'Anonymous Confession', date: '2024-12-12', duration: '2:30', isAudio: true },
  { id: '2', title: 'Written Confession', date: '2024-12-11', content: 'Lorem ipsum...', isAudio: false },
  // Add more mock confessions
];

interface Confession {
  id: string;
  content: string;
  type: 'audio' | 'text';
  createdAt: string;
  audioUrl?: string;
}

export default function LatestConfessionsScreen() {
  const [confessions, setConfessions] = useState(mockConfessions);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadConfessions = async () => {
    try {
      const latestConfessions = await getLatestConfessions(20);
      setConfessions(latestConfessions);
    } catch (error) {
      console.error('Error loading confessions:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadConfessions();
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Initial load
  React.useEffect(() => {
    loadConfessions().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#BB86FC" />
      </View>
    );
  }

  const renderConfessionItem = ({ item }) => (
    <TouchableOpacity style={styles.confessionItem}>
      <View style={styles.confessionHeader}>
        <Ionicons 
          name={item.isAudio ? 'volume-medium' : 'document-text'} 
          size={24} 
          color="#BB86FC" 
        />
        <Text style={styles.confessionTitle}>{item.title}</Text>
      </View>
      <Text style={styles.confessionDate}>{item.date}</Text>
      {item.isAudio ? (
        <Text style={styles.confessionDuration}>Duration: {item.duration}</Text>
      ) : (
        <Text style={styles.confessionContent} numberOfLines={2}>
          {item.content}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Confessions</Text>
      <FlatList
        data={confessions}
        renderItem={renderConfessionItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#BB86FC"
            colors={['#BB86FC']}
            progressBackgroundColor="#1E1E1E"
          />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#BB86FC',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  confessionItem: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  confessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  confessionTitle: {
    color: '#E1E1E1',
    fontSize: 18,
    marginLeft: 10,
  },
  confessionDate: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  confessionDuration: {
    color: '#BB86FC',
    fontSize: 14,
  },
  confessionContent: {
    color: '#999',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
