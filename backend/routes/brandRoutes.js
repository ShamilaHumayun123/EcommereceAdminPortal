const express = require("express");
const { getBrands, createBrand } = require("../controllers/brandController");

const router = express.Router();

router.get("/", getBrands);
router.post("/", createBrand);

module.exports = router;