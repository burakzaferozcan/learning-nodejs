const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  // overview page
  if (pathName === "/" || pathName === "/overview") {
    res.end("hello from the OVERVIEW");
  }
  // product page
  else if (pathName === "/product") {
    res.end("hello from the PRODUCT");
  }
  // API
  else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(data);
    });
  }
  // not-found
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>404 not found</h1>");
  }
});

server.listen(8000, () => {
  console.log("listening to request on port 8000 ");
});
