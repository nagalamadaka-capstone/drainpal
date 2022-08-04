// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  FIREBASEAPIKEY,
  FIREBASEAUTHDOMAIN,
  FIREBASEMESSAGESENDERID,
  FIREBASEPROJECTID,
  FIREBASEAPPID,
  FIREBASESTORAGEBUCKET,
} from "./securitykeys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASEAPIKEY,
  authDomain: FIREBASEAUTHDOMAIN,
  projectId: FIREBASEPROJECTID,
  storageBucket: FIREBASESTORAGEBUCKET,
  messagingSenderId: FIREBASEMESSAGESENDERID,
  appId: FIREBASEAPPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export default app;
