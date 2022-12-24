import { url } from "./script.js";
function createEl(tag = "div", className) {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}
const allPosts = [];
const main = document.querySelector("main");
class Post {
  constructor(opt = { author, text, date, time, id }) {
    this.id = opt.id;
    this.author = opt.author;
    this.text = opt.text;
    this.date = opt.date;
    this.time = opt.time;
    this.renderPost();
    this.addPost();
    this.deletePost();
    allPosts.push(this);
  }
  renderPost() {
    this.wrapper = createEl("div", "postWrapper");
    this.postAuthor = createEl("div", "postAuthor");
    this.postAuthor.textContent = this.author;
    this.postText = createEl("div", "postText");
    this.postText.textContent = this.text;
    this.postDate = createEl("div", "postDate");
    this.postDate.textContent = this.date;
    this.postTime = createEl("div", "postTime");
    this.postTime.textContent = this.time;
    this.Date_TimeWrapper = createEl("div", "Date_TimeWrapper");
    this.Date_TimeWrapper.append(this.postDate, this.postTime);
    this.form = createEl("form", "deleteForm");
    this.form.method = "post";
    this.form.action = "/post-delete";
    this.form.target = "dummyframe";
    this.deleteBtn = createEl("button", "deleteBtn");
    this.deleteBtn.type = "submit";
    this.form.append(this.deleteBtn);
    this.wrapper.append(
      this.form,
      this.postAuthor,
      this.postText,
      this.Date_TimeWrapper
    );
  }
  addPost() {
    main.append(this.wrapper);
  }
  deleteRequest(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = {
      id: this.id,
    };
    xhr.send(JSON.stringify(data));
  }
  deletePost() {
    this.deleteBtn.addEventListener("click", () => {
      allPosts.forEach((post) => {
        if (post.id === this.id) {
          this.wrapper.remove();
          allPosts.splice(allPosts.indexOf(post), 1);
          this.deleteRequest(url + "/post-delete");
        }
      });
    });
  }
}
export { Post, allPosts };
