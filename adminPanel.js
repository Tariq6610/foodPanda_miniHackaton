import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, signOut, auth } from "./adminAuth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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

const storage = getStorage(app);

let addItem = document.getElementById("add-item");
let category = document.getElementById("categories");
let addBtn = document.getElementById("addBtn");
let adminInp = document.getElementById("admin-inp");
let price = document.getElementById("price");
let menu = document.getElementById("menu");
let file = document.getElementById("Input_image");

// Add documents
addBtn &&
  addBtn.addEventListener("click", async () => {
    let i = Math.ceil(Math.random() * 100564876);

    if (
      addItem.value !== "" &&
      category.value !== "" &&
      price.value !== "" &&
      file.value !== ""
    ) {
      try {
        const image = await uploadToStorage(file.files[0],i);
        console.log("image----", image);
        const docRef = await addDoc(collection(db, auth.currentUser.uid), {
          item: addItem.value,
          category: category.value,
          price: price.value,
          index: i,
          image,
        });
        console.log(i);
        ClearFields();
        console.log("Document written with ID: ", docRef.id);

      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  });

//clear fields
function ClearFields() {
  addItem.value = "";
  category.value = "Category";
  price.value = "";
  file.value = "";
}

//update panel
let updateAdminPanel = async () => {
  let adminName = document.getElementById("admin-inp").value;
  console.log(adminName, auth.currentUser.uid);

  const userRef = doc(db, "admins", auth.currentUser.uid);
  if (adminName !== "") {
    await updateDoc(userRef, {
      name: adminName,
    });
    console.log("Profile Updated");
    location.reload();
  }
};

let nameUpdate = document.getElementById("nameUpdate");
nameUpdate && nameUpdate.addEventListener("click", updateAdminPanel);

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

// Retrieving UID from local storage
const currentUserUid = sessionStorage.getItem("currentUserUid");
console.log("current User Uid", currentUserUid);

//get realTime data
let getData = async () => {
  const ref = query(collection(db, currentUserUid));
  const unsubscribe = onSnapshot(ref, (querySnapshot) => {
   if (menu){
     menu.innerHTML = "";
   
    querySnapshot.forEach((doc) => {
      menu.innerHTML += `          <tr>
    <td>${doc.data().item}</td>
    <td>${doc.data().category}</td>
    <td>Rs.${doc.data().price}</td>
    <td>
    <img id="image" src="${doc.data().image}" alt="image">
    </td>
    <td>
    <button class='abc1 btn btn-danger' id="${doc.data().index}">Delete</button>
    <button class="abc2 btn btn-secondary" data-bs-toggle='modal' data-bs-target='#exampleModal' id="${
      doc.data().index
    }" >edit</button
    </td>
  </tr>`;
    });
  }
    // Now that the DOM has been updated, we can get the elements by class name
    let clss = document.getElementsByClassName("abc1");
    let clss2 = document.getElementsByClassName("abc2");
    let save_changes = document.getElementById("save_changes");
    console.log(`Number of elements with class 'abc1': ${clss.length}`);
    console.log(`Number of elements with class 'abc2': ${clss2.length}`);

    // Optional: log the text content of each element
    //Delete button
    for (let btn of clss) {
      btn.onclick = async () => {
        let btnId = parseInt(btn.id);
        const Ref = collection(db, currentUserUid);
        // Create a query against the collection.
        const q = query(Ref, where("index", "==", btnId));
        const querySnapshot = await getDocs(q);
        console.log("Number of Documents:", querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          console.log("Deleting Document:", doc.data());
          deleteDoc(docRef)
            .then(() => {
              console.log("Document successfully deleted!");
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
        });
      };
    }

    //edit button
    for (let btn of clss2) {
      btn.onclick = async () => {
        let btnId = parseInt(btn.id);
        const Ref = collection(db, currentUserUid);
        // Create a query against the collection.
        const q = query(Ref, where("index", "==", btnId));
        const querySnapshot = await getDocs(q);
        console.log("Number of Documents:", querySnapshot.size);
        save_changes.onclick = () => {
          querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            let updateValues = await getModalValues();
            let newImage = await uploadToStorage(updateValues.image,doc.data().index)
            console.log("updated image --->",newImage)
            if(updateValues.item && updateValues.category !== "Category" && updateValues.price && updateValues.image){
            await updateDoc(docRef, {
              item: updateValues.item,
              category: updateValues.category,
              price: updateValues.price,
              image: newImage
            });
            console.log("item Updated");
          }
          });
        };
      };
    }
  });
};



let uploadToStorage = (file, docUid) => {
  return new Promise((resolve, reject) => {
    let fileName = file.name;
    console.log();
    const storageRef = ref(
      storage,
      // `admin/${currentUserUid}/${docUid}${fileName}.jpeg`
      `admin/${currentUserUid}/${docUid}${fileName.slice(fileName.lastIndexOf("."))}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

//get modal values
let getModalValues = async () => {
  let modal_item = document.getElementById("modal_item");
  let modal_price = document.getElementById("modal_price");
  let modal_categories = document.getElementById("modal_categories");
  let modal_image = document.getElementById("modal-Input_image");

  let values = {
    item: modal_item.value,
    price: modal_price.value,
    category: modal_categories.value,
    image: modal_image.files[0],
  };
  modal_item.value = "";
  modal_price.value = "";
  modal_categories.value = "Category";
  modal_image.value = '';
  return values;
};

getData();

export { setDoc, doc, db, getDoc, updateAdminPanel };
