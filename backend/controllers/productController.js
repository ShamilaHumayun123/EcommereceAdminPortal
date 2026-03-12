const Product = require("../models/ProductModel");

const uploadProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageFiles = req.files.map(file => file.filename);
    const imageString = imageFiles.join(",");

    const productData = {
      title: req.body.title,
      price: parseFloat(req.body.price) || 0,
      discount: parseFloat(req.body.discount) || 0,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      shipping: parseFloat(req.body.shipping) || 0,
      tax: parseFloat(req.body.tax) || 0,
      tag: req.body.tag,
      images: imageString
    };

    await Product.createProduct(productData);

    res.status(200).json({ message: "Product uploaded successfully" });
  } catch (error) {
    console.error("Upload Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { uploadProduct };