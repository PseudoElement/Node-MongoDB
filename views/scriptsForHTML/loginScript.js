const loginBtn = document.querySelector(".loginBtn");
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
loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!inputUsername.value || !inputPassword.value) return;
  sendRequest(`${url}/auth/login`);
  location.replace(url);
});
