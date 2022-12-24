import { url } from "./script.js";
const linkHere = document.querySelector(`.span-link`);
const a = document.querySelector(`h2 a`);
console.log(a);
linkHere.setAttribute("target", "_blank");
linkHere.addEventListener("mouseover", (event) => {
  event.target.style.color = "yellow";
});
linkHere.addEventListener("mouseout", (event) => {
  event.target.style.color = "blueviolet";
});
linkHere.addEventListener("click", (event) => {
  window.open(`${url}/api`);
});
