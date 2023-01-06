export function postForm(path, params) {
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
export const url = `http://localhost:80`;
export function sendRequest(URL) {
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
