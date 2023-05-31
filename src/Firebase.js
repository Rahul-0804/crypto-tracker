// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSrXxZ8sdfr3sr79y5Xn3T0VVIBrnOaB8",
  authDomain: "crypto-base-177a0.firebaseapp.com",
  projectId: "crypto-base-177a0",
  storageBucket: "crypto-base-177a0.appspot.com",
  messagingSenderId: "205702149783",
  appId: "1:205702149783:web:91582d2ca1099ac2361bd2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;