// 1- select all elements and declare needed variables:

// 2- create a sign up function:
// A- store user's data:

// B- check if there is users:
// >- if not then this will be the first user.
// >- else then check if the givin email is already excited.

// DOM Selections:
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const signUpBtn = document.getElementById("signUpBtn");
const visibileBtn = document.getElementById("visibileBtn");
const warningBox = document.getElementById("warningBox");
const emailFeed = document.getElementById("emailFeed");
const passwordFeed = document.getElementById("passwordFeed");

// Stores:
let users = [];

if (localStorage.getItem("usersInfo")) {
  users = JSON.parse(localStorage.getItem("usersInfo"));
  console.log(users);
}
let userInfo = {
  name: null,
  email: null,
  password: null,
};

signUpBtn.addEventListener("click", () => {
  userInfo = {
    name: userName.value.toLowerCase().trim(),
  };

  let emailChecking = () => {
    let emailRegEx = /^\w+@[a-z]{5}\.(com|net|org|eg)$/gi;
    if (emailRegEx.test(userEmail.value.toLowerCase().trim())) {
      userEmail.classList.remove("is-invalid");
      userEmail.classList.add("is-valid");
      emailFeed.style.visibility = "hidden";
      userInfo.email = userEmail.value.toLowerCase().trim();
      return true;
    } else {
      userEmail.classList.remove("is-valid");
      userEmail.classList.add("is-invalid");
      emailFeed.style.visibility = "visible";
      emailFeed.innerHTML =
        '<h6 class="text-danger fw-normal">Invalid email</h6>';
      return false;
    }
  };
  let passwordChecking = () => {
    let passwordRegEx = /^(?=.*[A-Z])\w{8,16}$/gi;
    if (passwordRegEx.test(userPassword.value.trim())) {
      userPassword.classList.remove("is-invalid");
      userPassword.classList.add("is-valid");
      passwordFeed.style.visibility = "hidden";
      userInfo.password = userPassword.value.trim();
      return true;
    } else {
      console.error("invalid Password");
      userPassword.classList.remove("is-valid");
      userPassword.classList.add("is-invalid");
      passwordFeed.style.visibility = "visible";
      passwordFeed.innerHTML =
        '<h6 class="text-danger fw-normal">Password must begin with one capital letter at least and ends with numbers</h6>';
      return false;
    }
  };

  // B- check if there is users:
  // >- if not then this will be the first user.
  // >- else then check if the givin email is already excited.
  if (!users.length) {
    if (emailChecking() && passwordChecking()) {
      users.push(userInfo);
      userName.value = null;
      userEmail.value = null;
      userPassword.value = null;
      visibileBtn.style.visibility = "hidden";
      // #Save User Data in the localStorage;
      localStorage.setItem("usersInfo", JSON.stringify(users));
      localStorage.setItem("currentUserName", JSON.stringify(userInfo.name));
      window.location.href = "../home/homePage.html";
    }
  } else {
    users.forEach((ele) => {
      if (ele.email === userEmail.value.toLowerCase().trim()) {
        userEmail.classList.remove("is-valid");
        userEmail.classList.add("is-invalid");
        emailFeed.style.visibility = "visible";
        warningBox.style.visibility = "visible";
        warningBox.innerHTML =
          '<h6 class="text-danger fw-normal">This email is already excited !</h6>';
      } else {
        if (emailChecking() && passwordChecking()) {
          users.push(userInfo);
          userName.value = null;
          userEmail.value = null;
          userPassword.value = null;
          visibileBtn.style.visibility = "hidden";
          // #Save User Data in the localStorage;
          localStorage.setItem("usersInfo", JSON.stringify(users));
          localStorage.setItem(
            "currentUserName",
            JSON.stringify(userInfo.name)
          );
          window.location.href = "../home/homePage.html";
        }
      }
    });
  }
});
console.log(users);

visibileBtn.addEventListener("click", () => {
  if (userPassword.type === "password") {
    userPassword.type = "text";
    visibileBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
  } else {
    userPassword.type = "password";
    visibileBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
  }
});

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
