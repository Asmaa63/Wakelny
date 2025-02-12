import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCb12eKVcE4C33bBMHoYBc1R6ZusKRl_ac",
  authDomain: "lawyers-da830.firebaseapp.com",
  projectId: "lawyers-da830",
  storageBucket: "lawyers-da830.appspot.com",
  messagingSenderId: "948470698566",
  appId: "1:948470698566:web:86c8f1de55ad0b7b75b047",
  measurementId: "G-KLYNYXKCFX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { app, auth, db, storage };
