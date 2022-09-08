import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyBBNRpSY9MMyjYU8mlDcXPzW0sL0zyrYX0',
  authDomain: 'locky-dd1f0.firebaseapp.com',
  projectId: 'locky-dd1f0',
  storageBucket: 'locky-dd1f0.appspot.com',
  messagingSenderId: '1012602760889',
  appId: '1:1012602760889:web:6029a36edb19daf7b43568'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export default db;