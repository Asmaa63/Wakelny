// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // قاعدة البيانات Firestore
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
   apiKey: "AIzaSyCb12eKVcE4C33bBMHoYBc1R6ZusKRl_ac",
  authDomain: "lawyers-da830.firebaseapp.com",
  projectId: "lawyers-da830",
  storageBucket: "lawyers-da830.firebasestorage.app",
  messagingSenderId: "948470698566",
  appId: "1:948470698566:web:86c8f1de55ad0b7b75b047",
  measurementId: "G-KLYNYXKCFX"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // المصادقة Authentication
const db = getFirestore(app); // قاعدة البيانات Firestore
const storage = getStorage(app); // تخزين الملفات Storage

export { app, auth, db, storage };