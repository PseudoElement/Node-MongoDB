import { divWrapper } from "./script.js";
import { Post } from "./postClass.js";
const submit = document.querySelector("form button");
const postAuthor = document.querySelector("form input");
const postText = document.querySelector("form textarea");
const dbURL = "http://localhost:80/data-from-db";
divWrapper.remove();
window.addEventListener("DOMContentLoaded", () => {
  // loadPosts();
  fetch(dbURL)
    .then((resp) => {
      return resp.json();
    })
    .then(
      (data) => {
        data.forEach(post=>{
            const newPost = new Post({
                id: post.id,
                author: post.author,
                text: post.text,
                date: post.date,
                time: post.time,
              });
        })
      }
    )
    .catch((e) => console.log("My error is" + e));
});
submit.addEventListener("click", (event) => {
  if (!postAuthor.value || !postText.value) return;
  setTimeout(() => {
    postText.value = "";
    postAuthor.value = "";
  }, 100);
});
