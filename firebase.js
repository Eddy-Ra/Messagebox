import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, update ,ref, set, collection, addDoc, serverTimestamp, query, push, orderBy, onSnapshot, onValue, get, DataSnapshot } from 'firebase/database';
import { getStorage } from 'firebase/storage';  // Importation du service de stockage

const firebaseConfig = {
  apiKey: "AIzaSyDPFYpCJ6b93w9JVnwF5YbNHtqCopMiY00",
  authDomain: "message-bdea3.firebaseapp.com",
  projectId: "message-bdea3",
  storageBucket: "message-bdea3.firebasestorage.app",
  messagingSenderId: "680649408212",
  appId: "1:680649408212:web:061cde2f8529088932c541",
  measurementId: "G-81L674FE3G"
  
};




// Exemple de connexion



const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app); 
signInWithEmailAndPassword(auth, "user@example.com", "motdepasse123")
  .then(() => {
    console.log("Connecté !");
  })
  .catch((error) => {
    console.error("Erreur de connexion :", error.message);
  });

// Une fois connecté
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userRef = ref(db, 'users/' + user.uid);
    set(userRef, {
      name: "John",
      email: user.email
    });
  } else {
    console.log("Utilisateur non connecté !");
  }
});
export { 
  db, 
  ref, 
  get, 
  set, 
  DataSnapshot, 
  collection, 
  push, 
  addDoc, 
  onValue, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot, 
  storage, 
  auth ,update 
};
