import {
  query,
  collection,
  db,
  getDocs,
  doc,
  onSnapshot,
} from "./adminPanel.js";

let getData = async () => {
  const q = query(collection(db, "admins"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let adminCard = document.getElementById("adminCard");
    if (adminCard) {
      adminCard.innerHTML += `
        <div  class="card" style="width: 18rem;">
        <img src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640772.jpg&fm=jpg" class="card-img-top" alt="...">
        <div  class="card-body">
          <h5 class="card-title">${doc.data().name}</h5>
          <p class="card-text">
          Our restaurant offers gourmet dishes made from fresh ingredients, with options ranging from succulent steaks to exquisite vegan meals..</p>
          <button id="${
            doc.data().uid
          }" class="btn btn-primary Restaurants">Check dishes</button>
        </div>
      </div> 
        `;
    }
  });

  let Restaurants = document.getElementsByClassName("Restaurants");
  for (let restaurant of Restaurants) {
    restaurant.onclick = async () => {
      let uid = restaurant.id;
      sessionStorage.setItem("restaurantUid", uid);
      window.location = "./dishes.html";
    };
  }
};

getData();
