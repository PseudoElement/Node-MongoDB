import { divWrapper } from "./script.js";
import { PostForMongoDB } from "./postCLassMDB.js";
const submit = document.querySelector("form button");
const postAuthor = document.querySelector("form input");
const postText = document.querySelector("form textarea");
const dbURL = "http://localhost:80/data-from-db";
divWrapper.remove();
window.addEventListener("DOMContentLoaded", () => {
  fetch(dbURL)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.forEach((post) => {
        const newPost = new PostForMongoDB({
          author: post.author,
          text: post.text,
          date: post.date,
          time: post.time,
          id: post._id,
        });
      });
    });
});
submit.addEventListener("click", (event) => {
  if (!postAuthor.value || !postText.value) return;
  setTimeout(() => {
    postText.value = "";
    postAuthor.value = "";
    location.reload(); //reload page to renew data from DB
  }, 100);
});
