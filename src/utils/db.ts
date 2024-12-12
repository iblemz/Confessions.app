import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// User operations
export const createUserProfile = async (userId: string, data: any) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...data,
    createdAt: Timestamp.now(),
  });
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

// Confession operations
export const createConfession = async (data: {
  userId: string;
  type: 'audio' | 'text';
  content: string;
  isAnonymous: boolean;
  audioUrl?: string;
}) => {
  const confessionRef = collection(db, 'confessions');
  const confession = await addDoc(confessionRef, {
    ...data,
    createdAt: Timestamp.now(),
  });

  // Add to user's confessions collection
  const userConfessionRef = doc(db, 'userConfessions', data.userId, 'confessions', confession.id);
  await setDoc(userConfessionRef, {
    confessionId: confession.id,
    timestamp: Timestamp.now(),
  });

  return confession.id;
};

export const getLatestConfessions = async (limitCount: number = 20) => {
  const confessionsRef = collection(db, 'confessions');
  const q = query(
    confessionsRef,
    orderBy('createdAt', 'desc'),
    firestoreLimit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
  }));
};

export const getUserConfessions = async (userId: string) => {
  const userConfessionsRef = collection(db, 'userConfessions', userId, 'confessions');
  const q = query(
    userConfessionsRef,
    orderBy('timestamp', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
  }));
};
