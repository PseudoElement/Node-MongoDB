const loginBtn = document.querySelector(".loginBtn");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const url = `http://localhost:80`;
loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!inputUsername.value || !inputPassword.value) return;
  fetch(`${url}/auth/login`, {
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
    .then((data) => {
      if (data.status === 400) {
        fetch(`${url}/error`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: data.status,
            message: data.message,
          }),
        }).then(() => location.assign(`${url}/error`));
      } else {
        location.assign(`${url}/`);
      }
    })
    .catch((e) => console.log(e));
});
