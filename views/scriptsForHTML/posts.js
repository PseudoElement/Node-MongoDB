import { Post, allPosts } from "./postClass.js";
import { url } from "./script.js";
const submit = document.querySelector("form button");
const postAuthor = document.querySelector("form input");
const postText = document.querySelector("form textarea");
const weights = document.querySelector(".divWrapper");
const URL = `${url}/post-data`;
weights.remove();
function loadPosts() {
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  };
  let request = new Request("../scriptsForHTML/postsData.json", init);
  fetch(request)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.array.forEach((post) => {
        const newPost = new Post({
          id: post.id,
          author: post.author,
          text: post.text,
          date: post.date,
          time: post.time,
        });
      });
    });
}
function sendRequest() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  let data = {
    author: postAuthor.value,
    text: postText.value,
  };
  xhr.send(JSON.stringify(data));
}
window.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});
function getMaxId() {
  let maxID = 0;
  allPosts.forEach((post) => {
    if (post.id >= maxID) maxID = post.id + 1;
  });
  return maxID;
}
submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (!postAuthor.value || !postText.value) return;
  const newPost = new Post({
    author: postAuthor.value,
    text: postText.value,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    id: getMaxId(),
  });
  sendRequest();
  setTimeout(() => {
    postAuthor.value = "";
    postText.value = "";
  }, 100);
});
