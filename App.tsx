import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from './src/contexts/AuthContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LatestConfessionsScreen from './src/screens/LatestConfessionsScreen';
import CreateConfessionScreen from './src/screens/CreateConfessionScreen';
import RecordConfession from './RecordConfession';
import TestScreen from './src/screens/TestScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#BB86FC',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ 
          title: 'Create Account',
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Latest') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'AuthTab') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          } else if (route.name === 'Record') {
            iconName = focused ? 'mic' : 'mic-outline';
          } else if (route.name === 'TestTab') {
            iconName = focused ? 'bug' : 'bug-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#BB86FC',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: '#333',
        },
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#BB86FC',
      })}
    >
      <Tab.Screen name="Latest" component={LatestConfessionsScreen} />
      <Tab.Screen name="Create" component={CreateConfessionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="AuthTab"
        component={AuthStack}
        options={{ title: 'Account', headerShown: false }}
      />
      <Tab.Screen
        name="Record"
        component={RecordConfession}
        options={{
          title: 'Record Confession',
        }}
      />
      <Tab.Screen
        name="TestTab"
        component={TestScreen}
        options={{
          title: 'Test',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <MainTabs />
      </NavigationContainer>
    </AuthProvider>
  );
}
