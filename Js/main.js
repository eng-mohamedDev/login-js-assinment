// get Data from localStorage:
let users = [];
if (localStorage.getItem("usersInfo")) {
  users = JSON.parse(localStorage.getItem("usersInfo"));
}

// 1- DOM Elements Selection1:
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const singInBtn = document.getElementById("singInBtn");
const visibileBtn = document.getElementById("visibileBtn");
const warningBox = document.getElementById("warningBox");
const emailFeed = document.getElementById("emailFeed");
const passwordFeed = document.getElementById("passwordFeed");

userEmail.addEventListener("keyup", (e) => {
  if (e.currentTarget.classList.contains("is-invalid")) {
    e.currentTarget.classList.remove("is-invalid");
    emailFeed.style.display = "none";
  }
});
userPassword.addEventListener("keyup", (e) => {
  visibileBtn.style.visibility = "visible";
  if (e.currentTarget.classList.contains("is-invalid")) {
    e.currentTarget.classList.remove("is-invalid");
    passwordFeed.style.display = "none";
  }
});

singInBtn.addEventListener("click", () => {
  let userInfo = 0;

  if (userEmail.length != 0) {
    userInfo = users.findIndex((ele) => {
      return ele.email === userEmail.value;
    });
    if (userInfo != -1) {
      let emailChecking = () => {
        if (users[userInfo].email == userEmail.value.toLowerCase().trim()) {
          return true;
        } else {
          console.log("Email is wrong");
          userEmail.classList.add("is-invalid");
          emailFeed.style.visibility = "visible";
          emailFeed.innerHTML =
            '<h6 class="text-danger fw-normal">Wrong Email !</h6>';
          return false;
        }
      };
      let passwordChecking = () => {
        if (users[userInfo].password === userPassword.value.trim()) {
          console.log("Password is valid");
          return true;
        } else {
          userPassword.classList.add("is-invalid");
          passwordFeed.style.visibility = "visible";
          passwordFeed.innerHTML =
            '<h6 class="text-danger fw-normal">Wrong Password !</h6>';
          return false;
        }
      };
      if (emailChecking() && passwordChecking()) {
        // LocalStorage
        localStorage.setItem(
          "currentUserName",
          JSON.stringify(users[userInfo].name)
        );
        window.location.assign("../home/homePage.html");
      }
    } else {
      userEmail.classList.add("is-invalid");
      userPassword.classList.add("is-invalid");
      visibileBtn.style.visibility = "hidden";
      warningBox.style.visibility = "visible";
      warningBox.innerHTML =
        '<h6 class="text-danger fw-normal">This email is not exicted, Please create an account !</h6>';
    }
  }
});
visibileBtn.addEventListener("click", () => {
  if (userPassword.type === "password") {
    userPassword.type = "text";
    visibileBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
  } else {
    userPassword.type = "password";
    visibileBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
  }
});
