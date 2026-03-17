const express = require("express");
const { getBrands, createBrand, updateBrand, deleteBrand } = require("../controllers/brandController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getBrands);
router.post("/", upload.single("image"), createBrand);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;