const http = require("http");
console.log(__dirname);
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log(`Test nodemon`);
  res.setHeader("Content-type", "text/html");
  const createPath = (page) => path.join(__dirname, `../middleware/${page}.html`);
  let basePath = "";
  switch (req.url) {
    case "/":
      console.log(req.url);
      basePath = createPath("index3");
      res.statusCode = 200;
      break;
    case "/contacts":
      console.log(req.url);
      basePath = createPath("contacts");
      res.statusCode = 200;
      break;
    default:
      console.log(req.url);
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }
  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      console.log(`Some text`)
      res.write(`<div>New text for testing nodemon</div>`)
      res.end();
    }
  });
});
server.listen(PORT, "localhost", (err) => {
  err
    ? console.error(`My error is ${err}`)
    : console.log(`Listenting PORT ${PORT}...`);
});
