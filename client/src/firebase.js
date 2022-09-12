import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "",
  authDomain: "video-5177d.firebaseapp.com",
  projectId: "video-5177d",
  storageBucket: "video-5177d.appspot.com",
  messagingSenderId: "756420466614",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;