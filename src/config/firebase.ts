import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKinw7VbO0zIj4koZar79Zgcwzungqliw",
  authDomain: "confessions-a0f87.firebaseapp.com",
  projectId: "confessions-a0f87",
  storageBucket: "confessions-a0f87.firebasestorage.app",
  messagingSenderId: "39431252165",
  appId: "1:39431252165:web:74bb2c75d06ce255bf28ac",
  measurementId: "G-VJCN8VYCL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
