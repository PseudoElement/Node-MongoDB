import { Post, createEl, main } from "./postClass.js";
import { url } from "./script.js";
class PostForMongoDB extends Post {
  constructor(obj) {
    super( obj );//super({ author, text, date, time, id })
    this.deleteRequest(url + "/delete-post-mongoDB");
  }
  deleteRequest(url) {
    this.deleteBtn.addEventListener("click", () => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      let data = {
        id: this.id,
      };
      xhr.send(JSON.stringify(data));
      location.reload();
    });
  }
}
export { PostForMongoDB };
