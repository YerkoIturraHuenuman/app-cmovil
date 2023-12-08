import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCzxO-jfK2hYO2Jjfve46bJH7EBRXu8oY",
  authDomain: "app-cmovil.firebaseapp.com",
  projectId: "app-cmovil",
  storageBucket: "app-cmovil.appspot.com",
  messagingSenderId: "1063934609160",
  appId: "1:1063934609160:web:43da0b7c60b1aedc598ebd",
  databaseURL: "https://app-cmovil-default-rtdb.firebaseio.com/",
  storageBucket: "gs://app-cmovil.appspot.com",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage };
