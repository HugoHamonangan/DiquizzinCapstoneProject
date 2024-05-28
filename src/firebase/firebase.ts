import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAuhK4wCuAQe-yPnmEgixPQyqAXN6oFkOA',
  authDomain: 'diquizzin-db.firebaseapp.com',
  projectId: 'diquizzin-db',
  storageBucket: 'diquizzin-db.appspot.com',
  messagingSenderId: '788703822085',
  appId: '1:788703822085:web:fb21276bab8a2de3f3776c',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
