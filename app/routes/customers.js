const express = require("express");
const router = express.Router();
const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../db/customers");
const { validateCustomer } = require("../utils/validate");

router.get("/", getAllCustomers);
router.post("/", createNewCustomer);
router.put("/:id", modifyCustomer);
router.delete("/:id", removeCustomer);

module.exports = router;

async function getAllCustomers(req, res) {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    handleError;
  }
}

async function createNewCustomer(req, res) {
  try {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newCustomer = await addCustomer(req.body);
    res.json(newCustomer);
  } catch (error) {
    handleError;
  }
}

async function modifyCustomer(req, res) {
  try {
    const updatedCustomer = await updateCustomer(req.params.id, req.body);
    if (Boolean(updatedCustomer)) {
      return res.json(updatedCustomer);
    }
    return res.status(404).send("Customer id not found");
  } catch (error) {
    handleError;
  }
}

async function removeCustomer(req, res) {
  try {
    const deletedCustomer = await deleteCustomer(req.params.id);
    if (!Boolean(deleteCustomer))
      return res.status(404).send("No user with this id found");

    return res.json(deletedCustomer);
  } catch (error) {
    handleError;
  }
}

function handleError(error) {
  res.status(500).send(error);
}
