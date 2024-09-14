// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtgsrb3QRXW5UYwgZ-35k6c_6VrKVkkU4",
  authDomain: "netflixgpt-3722b.firebaseapp.com",
  projectId: "netflixgpt-3722b",
  storageBucket: "netflixgpt-3722b.appspot.com",
  messagingSenderId: "809884985539",
  appId: "1:809884985539:web:14ec0eac62d187004ada76",
  measurementId: "G-SZ882RH9KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
