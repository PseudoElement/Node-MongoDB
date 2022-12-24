const fs = require("fs");
const { resolve } = require("path");
const data = fs.readFileSync("./Lessons/events.js", "utf-8");
//read synchronically existing file(root to file, format)
const newFile = fs.writeFileSync('./folder/newDoc.txt', data);
//write new file(fileName and root for placing file, content)
fs.readFileSync("./folder/newDoc.txt", "utf-8");
fs.readFile("./folder/newDoc.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data); //can write .toString() instead of adding parameter 'utf-8'
});

function createFolder() {
  return new Promise((resolve) => {
    fs.mkdir("../files", () => {
      //create new folder(root)
      console.log(`add folder`);
    });
    resolve();
  });
}
function createFile() {
  return new Promise((resolve) => {
    fs.writeFile("../files/Document.txt", data, (err, data) => {
      //async writing
      console.log("Write file");
    });
    resolve();
  });
}
function readFile() {
  return new Promise((resolve) => {
    fs.readFile("../files/Document.txt", "utf-8", (err, data) => {
      if (err) throw error;
      console.log(`read file`);
      resolve(data);
    });
  });
}
createFolder()
  .then(() => createFile())
  .then(() => readFile())
  .then((data) =>
    fs.writeFile("../files/Doc2.txt", data, () => {
      console.log(`write 2nd file`);
    })
  )
  .catch((e) => console.error(e));
// async function myFunc(){
//   await fs.mkdir("./files", () => {
//     console.log(`add folder`);
//   });
//   await fs.writeFile("./files/Document.txt", data, () => {
//     console.log(`write File`);
//   });
//   // const response = await readFile();
//   await fs.writeFile('/files/Doc2.txt', 'asdasd', ()=>{
//     console.log(`write 2nd file`)
//   })
// }
// myFunc();
// setTimeout(() => {//remove file
//     if(fs.existsSync('./files/Document.txt')){//check - is file existing
//         fs.unlink("./files/Document.txt", () => {
//             console.log(`remove file`);
//           });
//     }
// }, 3000);
// setTimeout(() => {//remove folder(timer here for exmaple)
//     if(fs.existsSync('./files')){
//         fs.rmdir("./files", () => {
//             console.log(`remove folder`);
//           });
//     }
// }, 6000);
