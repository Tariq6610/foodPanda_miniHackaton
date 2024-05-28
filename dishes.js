import{query, collection, db, getDocs, onSnapshot, where} from "./adminPanel.js"



document.addEventListener('DOMContentLoaded', async () => {
    let uid = sessionStorage.getItem('restaurantUid');
    
    const Ref = collection(db, "admins");
    const q = query(Ref, where("uid", "==", uid));
    const getAdmin = await getDocs(q);
    getAdmin.forEach((doc)=>{
        let RestaurantName = document.getElementById('RestauName') 
        let Restaurant = doc.data().name;
        RestaurantName.innerHTML = Restaurant;
    })


    if (uid) {
      const ref = await query(collection(db, uid));
      const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        let dishesCardBody = document.getElementById("dishesCardBody");
        dishesCardBody.innerHTML = ''; // Clear any existing content
        
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log(data)
          dishesCardBody.innerHTML += `
          <div class="d-flex flex-wrap gap-2 py-3 px-2 mb-4 border justify-content-between align-items-center">
          <div class="d-flex gap-4">
            <img
              width="150"
              src="${data.image}"
              alt="..."
            />
            <div>
              <h4 class="card-title">${data.item}</h4>
              <h5>RS.${data.price}</h5>
              <p class="card-text">Serves 1 to 2 persons</p>
            </div>
          </div>
          <div>
            <button class="qty"><i class="fa-solid fa-minus"></i></button>
            <span class="fw-bold">1</span>
            <button class="qty"><i class="fa-solid fa-plus"></i></button>
            <a href="#" class="btn ms-2">Add to Cart</a>
          </div>
        </div>  
          `;
        });
      });
    }
  });
  