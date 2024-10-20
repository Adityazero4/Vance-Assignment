import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxrIqJ_lt_uVkBu8JfavkMerN_p_K-_vI",
  authDomain: "vance-b19ea.firebaseapp.com",
  projectId: "vance-b19ea",
  storageBucket: "vance-b19ea.appspot.com",
  messagingSenderId: "796219572154",
  appId: "1:796219572154:web:03b5c06959342218312783"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 


export { auth, db, provider };
