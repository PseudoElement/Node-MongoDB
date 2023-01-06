const loginBtn = document.querySelector(".loginBtn");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const url = `http://localhost:80`;
function postForm(path, params) {
  let method = "post";
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}
function sendRequest(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${url}/`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      location.assign(`${url}/`);
    }
  };
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    username: data.username,
    token: data.token,
    status: data.status,
  }));
}
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
      if(res.status === 400){
        postForm(`${url}/error`, {
          status: res.status,
          message: res.message,
        });
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 400) {
        postForm(`${url}/error`, {
          status: res.status,
          message: res.message,
        });
      } else {
        sendRequest(res);
      }
    })
    .catch((e) => console.log(e));
});
