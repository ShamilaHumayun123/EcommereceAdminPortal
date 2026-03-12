// routes/productRoutes.js
const express = require("express");
const { uploadProduct } = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.array("images"), uploadProduct);

module.exports = router;