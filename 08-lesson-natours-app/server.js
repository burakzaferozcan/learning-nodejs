const dotenv = require("dotenv");
const app = require("./app.js");
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app runing run port ${port}`);
});
