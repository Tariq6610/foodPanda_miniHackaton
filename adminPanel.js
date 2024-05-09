import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzrD8zBVXBKL7eCr6D8QXf_-aZJ7KOVfs",
  authDomain: "foodpanda-admin.firebaseapp.com",
  projectId: "foodpanda-admin",
  storageBucket: "foodpanda-admin.appspot.com",
  messagingSenderId: "221654740679",
  appId: "1:221654740679:web:a9e09989957b72e00658e2"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let addItem = document.getElementById('add-item');
let catagory = document.getElementById('categories');
let addBtn = document.getElementById('addBtn');
let adminInp = document.getElementById('admin-inp');
let adminName = document.getElementById('admin-name');

// Add documents
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

