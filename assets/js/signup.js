let form = document.querySelector("form");
let icon1 = document.querySelector(".eye-icon1");
let icon2 = document.querySelector(".eye-icon2");
let nameInput = document.querySelector("#exampleInputName1");
let emailInput = document.querySelector("#exampleInputEmail1");
let passwordInput = document.querySelector("#exampleInputPassword1");
let nameHelp = document.querySelector("#nameHelp");
let emailHelp1 = document.querySelector("#emailHelp1");
let emailHelp2 = document.querySelector("#emailHelp2");
let passwordHelp = document.querySelector("#passwordHelp");
let inputs = document.querySelectorAll("input");
let users = JSON.parse(localStorage.getItem("users")) || [];
let emailExists = false;

function togglePassword() {
  let isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  icon1.classList.toggle("d-none");
  icon2.classList.toggle("d-none");
}
icon1.addEventListener("click", togglePassword);
icon2.addEventListener("click", togglePassword);

inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    input.style.borderColor = "#4486e9e7";
  });
  input.addEventListener("blur", function () {
    if (input.dataset.state === "error") {
      input.style.borderColor = "#dc3545";
    } else if (input.dataset.state === "success") {
      input.style.borderColor = "green";
    } else {
      input.style.borderColor = "white";
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
 let name = nameInput.value.trim();
 let email = emailInput.value.trim().toLowerCase();
 let password = passwordInput.value.trim();
  let nameReg = /^[A-Za-z\u0621-\u064A]{3,}(?:[ '-][A-Za-z\u0621-\u064A]{3,})*$/i;
  let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  let passwordReg = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_\-!@#$*&]{8,}$/;
  let isValid = true;

  if (name === "" || !nameReg.test(name)) {
      nameInput.style.borderColor = "#dc3545";
      nameInput.dataset.state = "error";
    nameHelp.classList.remove("d-none");
  } else {
      nameInput.style.borderColor = "green";
      nameInput.dataset.state = "success";
    nameHelp.classList.add("d-none");
  }

  let isExist = users.find((user) => email === user.email);

  if (email === "" || !emailReg.test(email)) {
      emailInput.style.borderColor = "#dc3545";
      emailInput.dataset.state = "error";
    emailHelp1.classList.remove("d-none");
    emailHelp2.classList.add("d-none");
    isValid = false;
    emailExists = false;
  } else if (isExist) {
      emailInput.style.borderColor = "#dc3545";
      emailInput.dataset.state = "error";
    emailHelp1.classList.add("d-none");
    emailHelp2.classList.remove("d-none");
    emailExists = true;
  } else {
    emailExists = false;
      emailInput.style.borderColor = "green";
      emailInput.dataset.state = "success";
    emailHelp1.classList.add("d-none");
    emailHelp2.classList.add("d-none");
  }

  if (password === "" || !passwordReg.test(password)) {
      passwordInput.style.borderColor = "#dc3545";
      passwordInput.dataset.state = "error";
    passwordHelp.classList.remove("d-none");
    icon1.style.top = "20px";
    icon2.style.top = "20px";
  } else {
      passwordInput.style.borderColor = "green";
      passwordInput.dataset.state = "success";
    passwordHelp.classList.add("d-none");
  }

  if (!isValid) {
    return;
  }

  let user = {
    name,
    email,
    password,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "login.html";
});