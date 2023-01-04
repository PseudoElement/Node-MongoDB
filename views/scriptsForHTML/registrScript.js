const registrBtn = document.querySelector(".registrBtn");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const url = `http://localhost:80`;
function sendRequest(URL) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", URL);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = {
      username: inputUsername.value,
      password: inputPassword.value,
    };
    xhr.send(JSON.stringify(data));
  }
registrBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!inputUsername.value || !inputPassword.value) return;
    sendRequest(`${url}/auth/registration`);
    location.replace(url);
  });