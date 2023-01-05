const loginBtn = document.querySelector(".loginBtn");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const url = `http://localhost:80`;
// function sendRequest(URL) {
//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", URL);
//   xhr.setRequestHeader("Accept", "application/json");
//   xhr.setRequestHeader("Content-Type", "application/json");
//   let data = {
//     username: inputUsername.value,
//     password: inputPassword.value,
//   };
//   xhr.send(JSON.stringify(data));
// }
// async function postData(url) {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: inputUsername.value,
//       password: inputPassword.value,
//     }),
//   });
//   return response; // parses JSON response into native JavaScript objects
// }

// postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });
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
      console.log("RESPONSE:" + JSON.stringify(res));
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
  // fetch(`${url}/auth/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     username: inputUsername.value,
  //     password: inputPassword.value,
  //   }),
  // }).then((response) => {
  //   console.log('RESPONSE:' + JSON.stringify(response))
  //   if (response.status === 200) {
  //     fetch(`${url}/auth/login`, {
  //       method: "GET",
  //     })
  //       .then((response) => {
  //         return response.text();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   return response.text();
  // });

  // .then((response) => {
  //   console.log(`Response.stringify: ${JSON.stringify(response.json())}`)
  //   return response.json();
  // })
  // .then((data) => console.log("DATA:" + data));
  // getResponse(`${url}/auth/login`).then((data) => console.log(data));
});
