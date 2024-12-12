import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  console.log('Starting Firebase connection test...');

  try {
    // Test 1: Auth Connection
    console.log('1. Testing Firebase Auth connection...');
    const authCurrentUser = auth.currentUser;
    console.log('Auth initialized successfully. Current user:', authCurrentUser?.email || 'No user logged in');

    // Test 2: Firestore Connection
    console.log('\n2. Testing Firestore connection...');
    const testCollection = collection(db, 'test_collection');
    const testDoc = await addDoc(testCollection, {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Test connection successful'
    });
    console.log('Successfully wrote to Firestore. Document ID:', testDoc.id);

    // Read the test document back
    const querySnapshot = await getDocs(testCollection);
    console.log('\nReading test collection:');
    querySnapshot.forEach((doc) => {
      console.log('Document data:', doc.data());
    });

    return {
      success: true,
      message: 'Firebase connection test completed successfully!'
    };

  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
};
