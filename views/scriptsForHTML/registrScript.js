import { postForm, url } from "./utilities.js";
const registrBtn = document.querySelector(".registrBtn");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
registrBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!inputUsername.value || !inputPassword.value) return;
  fetch(`${url}/auth/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: inputUsername.value,
      password: inputPassword.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status === 400) {
        postForm(`${url}/error`, {
          status: res.status,
          message: res.message,
        });
      } else {
        localStorage.setItem("Username", res.username);
        location.assign(`${url}/`);
      }
    });
});
