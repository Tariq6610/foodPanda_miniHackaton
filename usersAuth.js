import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import{
  setDoc,
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaGKikJ48BQRzQZKG8XxE0DvL2Z1QjgV4",
  authDomain: "foodpanda-users.firebaseapp.com",
  projectId: "foodpanda-users",
  storageBucket: "foodpanda-users.appspot.com",
  messagingSenderId: "404180195417",
  appId: "1:404180195417:web:37c619c1b90fd5b4b6b948",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


let authUser = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // Initialize Firebase Authentication and get a reference to the service
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "./userSignIn.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

let btn = document.getElementById("btn");
let sbtn = document.getElementById("sbtn");

if (btn) {
  btn.addEventListener("click", authUser);
}

let sEmail = document.querySelector("#sEmail");
let sPassword = document.querySelector("#sPassword");

let sAuth = () => {
  signInWithEmailAndPassword(auth, sEmail.value, sPassword.value)
    .then(async(userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.data()){
       await addUserToFirestore(user);
        location.reload();
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

if (sbtn) {
  sbtn.addEventListener("click", sAuth);
}

//Authentication through Google
let google_login = document.querySelector("#img");
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
google_login &&
  google_login.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(async(result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(user);
        if(!docSnap.data()){
         await addUserToFirestore(user);
          location.reload();
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });

// onAuthstateChanged
onAuthStateChanged(auth, async(user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log("users---->", docSnap.data().uid);
    if(docSnap.data()){
      // Storing UID in local storage
      sessionStorage.setItem('currentUserUid', docSnap.data().uid); 
      if(location.pathname !== '/userPanel.html'){
        window.location = './userPanel.html'
      }
      logemail.innerHTML = user.email;
      adminname.innerHTML = docSnap.data().name;
    }
  } else {
    if(location.pathname == '/userPanel.html'){
      window.location = './userSignin.html'
    }
    console.log("not login");
  }
});


//Add user to firestore
let addUserToFirestore = async (user) => {
  const rest = await setDoc(doc(db, 'users', user.uid),{
    name: user.displayName,
    email: user.email,
    uid: user.uid
  })
 }
