const Product = require("../models/ProductModel");

const uploadProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Map filenames to array (for model)
    const imageFiles = req.files.map(file => `/uploads/${file.filename}`);

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
      images: imageFiles 
    };

    // Call the correct model function
    await Product.create(productData);

    res.status(201).json({ message: "Product uploaded successfully" });
  } catch (error) {
    console.error("Upload Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { uploadProduct };