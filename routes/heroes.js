const express = require("express");
const router = express.Router();
const { getHeroes, findAndUpdateHero } = require("../db/heroes");

router.get("/", getAllHeroes);
router.put("/:id", updateHero);

module.exports = router;

async function getAllHeroes(req, res) {
  res.send(await getHeroes());
}

async function updateHero(req, res) {
  console.log(req.params.id);
  let hero = await findAndUpdateHero(req.params.id, req.body);

  console.log(hero);

  res.send(hero);
}
