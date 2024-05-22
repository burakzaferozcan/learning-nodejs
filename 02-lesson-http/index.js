const http = require("http");

// server
const server = http.createServer((req, res) => {
  res.end("hello from the server");
});

// listen
server.listen(8000, () => {
  console.log("listening to request on port 8000 ");
});
