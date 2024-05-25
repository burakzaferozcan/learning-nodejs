const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
//! istekleri yönetebilmek için middleware
app.use(express.json());
//! istekleri yönetebilmek için middleware
//? kendi Middlewar'ımızı oluşturalım
//? bu middleware her istek için geçerlidir çünkü spesifik bir istek belirtmedik
app.use((req, res, next) => {
  console.log("hello from the middleware");
  //todo next() kullanmazsak sonraki satırları çalıştırmaz
  next();
  //todo next() kullanmazsak sonraki satırları çalıştırmaz
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//? kendi Middlewar'ımızı oluşturalım
//? bu middleware her istek için geçerlidir çünkü spesifik bir istek belirtmedik

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  //! middleware
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  //! middleware
  console.log(req.requestTime);
  console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) return res.status(404).json({ message: "No tour found" });
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  //! middleware
  console.log(req.requestTime);
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) return console.log(err.message);
      console.log("new tour added");
      res.status(201).send({
        message: "success",
        requestedAt: req.requestTime,
        data: {
          newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  //! middleware
  console.log(req.requestTime);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  const tourIndex = tours.findIndex((el) => el.id === id);
  if (!tour) return res.status(404).json({ message: "No tour found" });
  const updatedTour = { ...tours[tourIndex], ...req.body };
  tours[tourIndex] = updatedTour;
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file", err);
        return res.status(500).json({ message: "Error writing file" });
      }
      res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};
const deleteTour = (req, res) => {
  //! middleware
  console.log(req.requestTime);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  const tourIndex = tours.findIndex((el) => el.id === id);
  if (!tour) return res.status(404).json({ message: "No tour found" });
  tours.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file", err);
        return res.status(500).json({ message: "Error writing file" });
      }
      res.status(204).json({
        status: "success",
        requestedAt: req.requestTime,
        data: null,
      });
    }
  );
};
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`app runing run port ${port}`);
});
