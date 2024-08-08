// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import for authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "pantry-tracker-9a381.firebaseapp.com",
  databaseURL: "https://pantry-tracker-9a381-default-rtdb.firebaseio.com",
  projectId: "pantry-tracker-9a381",
  storageBucket: "pantry-tracker-9a381.appspot.com",
  messagingSenderId: "682112584787",
  appId: "1:682112584787:web:0e28a319d689a6319ecaa6",
  measurementId: "G-EYQB27C7QT"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
const analytics = getAnalytics(cong);
const auth = getAuth(cong)

export default { cong, auth };