import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzrD8zBVXBKL7eCr6D8QXf_-aZJ7KOVfs",
  authDomain: "foodpanda-admin.firebaseapp.com",
  projectId: "foodpanda-admin",
  storageBucket: "foodpanda-admin.appspot.com",
  messagingSenderId: "221654740679",
  appId: "1:221654740679:web:a9e09989957b72e00658e2",
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
      window.location = "./adminSignIn.html";
    })
    .catch((error) => {
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
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location = "./adminPanel.html";
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
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location = "./adminPanel.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });

// //Add user to firestore
// let addUserToFirestoe = async (admin) => {
//   const rest = await setDoc(doc(db, 'admins', admin.uid),{

//   })
// }

let logemail = document.getElementById("log-email");
let adminname = document.getElementById("admin-name");


// onAuthstateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user---->", user);
    logemail.innerHTML = user.email;
    adminname.innerHTML = user.displayName;
  } else {
    console.log("not login");
  }
});

//logout
let logoutbtn = document.getElementById("logout-btn");

logoutbtn && logoutbtn.addEventListener("click", () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.')
      window.location = "./adminSignin.html"
    })
    .catch((error) => {
      console.log(error)
    });
});
