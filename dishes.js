import{query, collection, db, getDocs, onSnapshot, where} from "./adminPanel.js"


let dishes = [];
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
          dishes.push(data)
          // console.log(data)
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
            <button onclick="minus(${data.index})" class="qty"><i class="fa-solid fa-minus"></i></button>
            <span id="${data.index}" class="fw-bold">1</span>
            <button onclick="add(${data.index})" class="qty"><i class="fa-solid fa-plus"></i></button>
            <a onclick="addToCart(${data.index})" class="btn ms-2">Add to Cart</a>
          </div>
        </div>  
          `;
        });
      });
    }
  });


  const add = (id)=>{
    let quantity = document.getElementById(id);
    quantity.innerHTML = Number(quantity.innerHTML)+1;
  }

  const minus = (id)=>{
    let quantity = document.getElementById(id);
    if(quantity.innerHTML !== "1"){
      quantity.innerHTML = Number(quantity.innerHTML)-1;
    }
  }

  const addToCart = (id)=>{
    const cartItems = sessionStorage.getItem('cart');
    const cart = cartItems? JSON.parse(cartItems): [];
    const quantity = document.getElementById(id);
    let dish = dishes.filter(v => v.index === id)
    cart.push({...dish[0], qty : Number(quantity.innerHTML)});
    sessionStorage.setItem('cart', JSON.stringify(cart));
    quantity.innerHTML = "1"
    getCartItems()
    
  }

  const getCartItems = ()=>{
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cart = document.getElementById('Cart')
    // console.log('items====>',cartItems)
    if(cartItems.length){
      cart.innerHTML = ""
      let i = 0;
      cartItems.forEach((item)=>{
        console.log('itmes==>',item)
        cart.innerHTML += `
        <div class="card w-100 mb-3 border-0">
        <div class="card-body">
          <div class="d-flex py-3 px-2 mb-4 border justify-content-between align-items-center">
            <div class="d-flex gap-1">
              <img
                width="200"
                src="${item.image}"
                alt="..."
              />
              <div" >
                <h4 class="card-title">${item.item}</h4>
                <h5>RS.${item.price}</h5>
                <h6>Quantity - ${item.qty} </h6>
                <h6>Total - ${item.qty * item.price} </h6>
                <p class="card-text">Serves 1 to 2 persons</p>
              </div>
            </div>
            <div>
              <a id="delete" onclick="removeItem(${item.index})" class=""><i class="fa-solid fa-trash" style="color: #e21b70;"></i></a>
            </div>
          </div>
        </div>
      </div>
        `
      })

    }else{
      cart.innerHTML = "<i>Cart is empty</>"
    }

  }
  getCartItems()  

  const removeItem = (id)=>{
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));
    if(cartItems){
    let updatedCart  = cartItems.filter(v => id !== v.index)
    sessionStorage.setItem('cart',JSON.stringify(updatedCart))
    }
    getCartItems();
  }

  const checkOut = ()=>{
    sessionStorage.removeItem('cart');
    getCartItems() 
  }
  

  window.add = add;
  window.minus = minus;
  window.addToCart = addToCart;
  window.removeItem = removeItem;
  window.checkOut = checkOut;
  