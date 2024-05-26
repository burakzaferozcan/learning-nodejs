const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes.js");
const tourRouter = require("./routes/tourRoutes.js");

//! istekleri yönetebilmek için middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//? kendi Middlewar'ımızı oluşturalım
//? bu middleware her istek için geçerlidir çünkü spesifik bir istek belirtmedik
app.use((req, res, next) => {
  console.log("hello from the middleware");
  //todo next() kullanmazsak sonraki satırları çalıştırmaz
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
