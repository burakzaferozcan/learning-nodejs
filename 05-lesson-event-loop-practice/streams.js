const fs = require("fs");
const http = require("http");

const server = http.createServer();
server.on("request", (req, res) => {
  //? solution 1
  //? fs.readFile("test-file.txt", (err, data) => {
  //?   if (err) console.log(err);
  //?   res.end(data);
  //? });
  //! solution 2
  //! const readable = fs.createReadStream("test-file.txt");
  //! readable.on("data", (chunk) => {
  //!   res.write(chunk);
  //! });
  //! readable.on("end", () => {
  //!   res.end();
  //! });
  //! readable.on("error", (err) => {
  //!   console.log(err);
  //!   res.statusCode = 500;
  //!   res.end("data not found");
  //! });
  //todo solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});
server.listen(8000, () => {
  console.log("listening...");
});