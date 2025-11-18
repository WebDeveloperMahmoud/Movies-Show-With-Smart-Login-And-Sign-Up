let emailInput = document.querySelector("#exampleInputEmail1");
let passwordInput = document.querySelector("#exampleInputPassword1");
let emailHelp1 = document.querySelector("#emailHelp1");
let passwordHelp = document.querySelector("#passwordHelp");
let icon1 = document.querySelector(".eye-icon1");
let icon2 = document.querySelector(".eye-icon2");
let incorrectInput = document.querySelector(".incorrectInput");
let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");
let users = JSON.parse(localStorage.getItem("users")) || [];

function togglePassword() {
    passwordInput.type==="password" ? passwordInput.type="text" : passwordInput.type= "password";
    icon1.classList.toggle("d-none");
    icon2.classList.toggle("d-none");
}
icon1.addEventListener("click", togglePassword)
icon2.addEventListener("click", togglePassword);

inputs.forEach((input) => {
    input.addEventListener("focus", function () {
        input.style.borderColor = "#4486e9e7";
    })
    input.addEventListener("blur", function () {
        if (input.dataset.state === "error") {
            input.style.borderColor = "#dc3545";
        } else if (input.dataset.state === "success") {
            input.style.borderColor = "green";
        } else {
            input.style.borderColor = "white";
        }
    })
})

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value.trim();
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    let passwordReg = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_\-!@#$*&]{8,}$/;
    let isValid = true;

    incorrectInput.classList.add("d-none");

    if (email === "" || !emailReg.test(email)) {
        emailInput.style.borderColor = "#dc3545";
        emailInput.dataset.state = "error";
        emailHelp1.classList.remove("d-none");
        isValid = false;
    } else {
        emailInput.style.borderColor = "green";
        emailInput.dataset.state = "success";
        emailHelp1.classList.add("d-none");
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
    
    let matchedUser = users.find((user) => user.email === email && user.password === password);
    if (!matchedUser) {
        if (emailHelp1.classList.contains("d-none") && passwordHelp.classList.contains("d-none")) {
            incorrectInput.classList.remove("d-none");
        }
        return;
    }

    let currentUser = {
        email: matchedUser.email,
        logged: true,
    }
    users.push(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "index.html";
})