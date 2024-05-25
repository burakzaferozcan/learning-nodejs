const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello world", app: "natours" });
// });
// app.post("/", (req, res) => {
//   res.send("you can post to this endpoint");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});
app.listen(port, () => {
  console.log(`app runing run port ${port}`);
});
