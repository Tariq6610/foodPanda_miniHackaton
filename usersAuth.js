import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
      console.log(error);
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
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "./dashboard.html";
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
google_login.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "./dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
