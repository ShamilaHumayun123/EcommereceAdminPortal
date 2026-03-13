const Brand = require("../models/brandModel");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.getAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: "Error fetching brands", error: err });
  }
};

const createBrand = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ message: "Id and Name required" });

    await Brand.create({ id, name });
    res.status(201).json({ message: "Brand created successfully" });
  } catch (err) {
  console.error("Backend error:", err); // <-- logs exact DB error
  res.status(500).json({ message: "Error creating brand", error: err.message });
}
};

module.exports = { getBrands, createBrand };