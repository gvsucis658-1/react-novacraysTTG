import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDWBscldnKyba_fp6sgD-usvAAHoT2c6e8",
    authDomain: "react-novacraysttg.firebaseapp.com",
    projectId: "react-novacraysttg",
    storageBucket: "react-novacraysttg.firebasestorage.app",
    messagingSenderId: "3634671040",
    appId: "1:3634671040:web:b023ad7c2d803c39d9ec25",
    measurementId: "G-71Z79Y65MS"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export { db };
  