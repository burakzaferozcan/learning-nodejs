const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app.js");
dotenv.config({ path: "./.env" });
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("db connection successfull");
});
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});
const Tour = mongoose.model("Tour", tourSchema);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app runing run port ${port}`);
});
