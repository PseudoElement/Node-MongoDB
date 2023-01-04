const contacts = document.querySelectorAll("header h3")[2];
const aboutUs = document.querySelectorAll("header h3")[1];
const homePage = document.querySelectorAll("header h3")[0];
const main = document.querySelector("main");
const api = document.querySelectorAll("header h3")[5];
const posts_mongoDB = document.querySelectorAll("header h3")[4];
const posts = document.querySelectorAll("header h3")[3];
const divWrapper = document.createElement("div");
const signUp = document.querySelector(".signUp");
const logIn = document.querySelector(".logIn");
export const url = `http://localhost:80`;
divWrapper.className = "divWrapper";
main.append(divWrapper);
signUp.addEventListener("click", () => {
  location.replace(url + "/sign-up");
});
logIn.addEventListener("click", () => {
  location.replace(url + "/authorization");
});
posts_mongoDB.addEventListener("click", () => {
  location.replace(url + "/posts-mongodb");
});
posts.addEventListener("click", () => {
  location.replace(url + "/posts");
});
api.addEventListener("click", () => {
  location.replace(url + "/api");
});
contacts.addEventListener("click", () => {
  location.replace(url + "/contacts");
});
aboutUs.addEventListener("click", () => {
  location.replace(url + "/about-us");
});
homePage.addEventListener("click", () => {
  location.replace(url + "/");
});
fetch(url + "/api")
  .then((res) => {
    return res.json();
  })
  .then((data) =>
    data.forEach((el) => {
      const div = document.createElement("div");
      div.className = "weight";
      div.innerHTML = `${el.name} weighs ${el.weight} kg.`;
      divWrapper.append(div);
    })
  );

(function setFavicons(favImg) {
  let headTitle = document.querySelector("head");
  let setFavicon = document.createElement("link");
  setFavicon.setAttribute("rel", "shortcut icon");
  setFavicon.setAttribute("href", favImg);
  headTitle.append(setFavicon);
})("../templates/icons8-grinch-48.png");
export { divWrapper };
