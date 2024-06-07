const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app.js");
dotenv.config({ path: "./.env" });
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("db connection successfull");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app runing run port ${port}`);
});
