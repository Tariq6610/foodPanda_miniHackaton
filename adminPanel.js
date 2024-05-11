import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, signOut, auth } from "./adminAuth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzrD8zBVXBKL7eCr6D8QXf_-aZJ7KOVfs",
  authDomain: "foodpanda-admin.firebaseapp.com",
  projectId: "foodpanda-admin",
  storageBucket: "foodpanda-admin.appspot.com",
  messagingSenderId: "221654740679",
  appId: "1:221654740679:web:a9e09989957b72e00658e2",
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let addItem = document.getElementById("add-item");
let catagory = document.getElementById("categories");
let addBtn = document.getElementById("addBtn");
let adminInp = document.getElementById("admin-inp");

// Add documents
addBtn.addEventListener('click', async () =>{
  try {
    const docRef = await addDoc(collection(db, auth.currentUser.uid), {
      item: addItem.value,
      category: catagory.value,
      });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})


  


//update panel
let updateAdminPanel = async () => {
  let adminName = document.getElementById("admin-inp").value;
  console.log(adminName,auth.currentUser.uid);
  
  console.log(auth.currentUser)
  const userRef = doc(db, "admins", auth.currentUser.uid);
 if(adminName !== ""){
   await updateDoc(userRef, {
     name: adminName
   });
   console.log('Profile Updated')
   location.reload();
 }
};

let nameUpdate = document.getElementById('nameUpdate');
nameUpdate &&  nameUpdate.addEventListener('click',updateAdminPanel);
 


//logout
let logoutbtn = document.getElementById("logout-btn");

logoutbtn &&
  logoutbtn.addEventListener("click", () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        window.location = "./adminSignin.html";
      })
      .catch((error) => {
        console.log(error);
      });
  });

export { setDoc, doc, db, getDoc,updateAdminPanel };
