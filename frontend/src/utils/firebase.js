// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aiecomm-web.firebaseapp.com",
  projectId: "aiecomm-web",
  storageBucket: "aiecomm-web.firebasestorage.app",
  messagingSenderId: "720012029793",
  appId: "1:720012029793:web:2e83e77b0b388dce8f1f20",
  measurementId: "G-ZNCTFTCELE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider}