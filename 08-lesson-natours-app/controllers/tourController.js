const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
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
module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
