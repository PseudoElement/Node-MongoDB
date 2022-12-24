const http = require("http");
const fs = require("fs");
const index3 = fs.readFileSync("./html/index3.html");
// console.log(index);
const PORT = 777;
const server = http.createServer((req, res) => {
  console.log("Server request...");
//   console.log(req.method, req.url);
  res.setHeader("Content-Type", "text/html");
//   res.open("https://www.github.com", "");
  res.write(index3); //html on site
//   res.write(`<h2>2nd header</h2>`);
  res.end();
});
server.listen(PORT, "localhost", (err) => {
  err ? console.log(err) : console.log(`Port ${PORT} is working...`);
});
