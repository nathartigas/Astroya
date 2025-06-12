// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARcuVJ1BsgsVeOAeLJ_nbnOvuFp3WcvjM",
  authDomain: "landing-page-astroya.firebaseapp.com",
  projectId: "landing-page-astroya",
  storageBucket: "landing-page-astroya.firebasestorage.app",
  messagingSenderId: "194252823092",
  appId: "1:194252823092:web:2b9755233e8aee84ac4861",
  measurementId: "G-NK3L3MN5NC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Analytics only if supported (to avoid errors in environments where it's not)
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, analytics };
