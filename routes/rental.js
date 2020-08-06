const express = require("express");
const router = express.Router();
const {
  getRental,
  postRental,
  putRental,
  deleteRental,
} = require("../db/rental");

const rental = async (req, res) => {
  try {
    res.send(await getRental());
  } catch (error) {
    console.error(error);
  }
};

const addRental = async (req, res) => {
  try {
    const newMovie = await postRental(req.body);
    res.send(newMovie);
  } catch (error) {}
};

const changeRental = async (req, res) => {
  try {
    res.send(await putRental(req.params.id, req.body));
  } catch (error) {
    console.log(error);
  }
};

const removeRental = async (req, res) => {
  try {
    res.send(await deleteRental(req.params.id));
  } catch (error) {
    console.log(error);
  }
};

router.get("/", rental);
router.post("/", addRental);
router.put("/:id", changeRental);
router.delete("/:id", removeRental);

module.exports = router;
