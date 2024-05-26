//Admin
let adminSignin = document.querySelector(".Signin-btn");
let adminSignUp = document.querySelector(".Signup-btn");
let homeBtn = document.getElementById('homeBtn');

if(adminSignin){
    adminSignin.addEventListener("click", () => {
      window.location.href = "./adminSignin.html";
    });
}

if(adminSignUp){
    adminSignUp.addEventListener("click", () => {
      window.location.href = "./adminSignup.html";
    });
}

//User
let userSignUp = document.querySelector(".btn-Up");
let userSignin = document.querySelector(".btn-In");

if(userSignin){
    userSignin.addEventListener("click", () => {
      window.location.href = "./userSignin.html";
    });
}

if(userSignUp){
    userSignUp.addEventListener("click", () => {
      window.location.href = "./userSignup.html";
    });
} 

homeBtn && homeBtn.addEventListener('click', ()=>{
  window.location.href = "./index.html"
})
