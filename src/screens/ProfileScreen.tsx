import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigation.navigate('AuthTab', { screen: 'Login' });
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      // Reload user data if needed
      // You can add additional refresh logic here
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh profile');
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please login to view your profile</Text>
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#BB86FC"
          colors={['#BB86FC']}
          progressBackgroundColor="#1E1E1E"
        />
      }
    >
      <View style={styles.profileInfo}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Username: {user.displayName}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#121212" />
        ) : (
          <Text style={styles.buttonText}>Logout</Text>
        )}
      </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
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
