// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Database, getDatabase } from 'firebase/database';
import { Firestore, getFirestore } from "firebase/firestore";
import { Messaging, getMessaging } from 'firebase/messaging';
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};



//query references
//@link https://www.freecodecamp.org/news/how-to-manage-state-in-react-apps-with-firebase-cloud-firestore/
const app: FirebaseApp = initializeApp(firebaseConfig);
export const firebaseApp: FirebaseApp = app;
export const auth: Auth = getAuth(app);
export const database: Database = getDatabase(app);
export const firestore: Firestore = getFirestore(app);
export const storeage: FirebaseStorage = getStorage(app);
export const messaging: Messaging = getMessaging(app);



