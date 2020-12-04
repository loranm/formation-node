const express = require("express");
const router = express.Router();
const { getHeroes, findAndUpdateHero } = require("../db/heroes");
const { validateHero } = require("../utils/validate");

router.get("/", getAllHeroes);
router.post("/", createHero);
router.put("/:id", updateHero);

module.exports = router;

async function getAllHeroes(req, res) {
  res.send(await getHeroes());
}

async function createHero(req, res) {
  var { error } = validateHero(req.body);
  console.log(error);
  res.send("ok creating hero");
}

async function updateHero(req, res) {
  var { error } = validateHero(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let hero = await findAndUpdateHero(req.params.id, req.body);
    res.send(hero);
  } catch (error) {
    return res.status(404).send(`Id: _${req.params.id}_ does not exist`);
  }
}
