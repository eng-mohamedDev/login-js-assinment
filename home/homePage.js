// 1- DOM Elements Selection1:

const userName = document.getElementById("userName");

if (localStorage.getItem("currentUserName")) {
  let currentUserName = JSON.parse(localStorage.getItem("currentUserName"));
  userName.innerHTML = currentUserName;
}
