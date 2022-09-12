import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDPtgTQTfXyggTqK-9hcXvSPovR_qEXR6k",
  authDomain: "video-5177d.firebaseapp.com",
  projectId: "video-5177d",
  storageBucket: "video-5177d.appspot.com",
  messagingSenderId: "756420466614",
  appId: "1:756420466614:web:4da4c3cbe1758219f05317",
  measurementId: "G-F63J8MHMER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;