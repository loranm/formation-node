const express = require("express");
const router = express.Router();
const { getCrises, saveNewCrisis } = require("../db/crises");
const { validateCrisis } = require("../utils/validate");

router.get("/", getAllCrises);
router.post("/", createNewCrisis);
router.put("/:id", modifyCrisis);
router.delete("/:id", removeCrisis);

module.exports = router;

async function getAllCrises(req, res) {
  const crises = await getCrises();
  res.send(crises);
}

async function createNewCrisis(req, res) {
  const { error } = validateCrisis(req.body);
  if (Boolean(error)) return res.status(400).send(error.details[0].message);
  const crisis = await saveNewCrisis(req.body);
  res.json(crisis);
}

function modifyCrisis(req, res) {
  res.send("modifiy crisis");
}

function removeCrisis(req, res) {
  res.send("delete crisis");
}
