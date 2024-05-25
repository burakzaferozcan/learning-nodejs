const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require("../controllers/tourController.js");
router.param("id", checkID);
router.route("/").get(getAllTours).post(checkBody, createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(checkBody, updateTour)
  .delete(deleteTour);
module.exports = router;
