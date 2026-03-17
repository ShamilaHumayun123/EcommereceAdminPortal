const Brand = require("../models/brandModel");

// GET all brands
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.getAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: "Error fetching brands", error: err });
  }
};

// CREATE brand with image
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    await Brand.create({ name, imagePath });
    res.status(201).json({ message: "Brand created successfully" });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ message: "Error creating brand", error: err.message });
  }
};

// UPDATE brand with optional new image
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    await Brand.update({ id, name, imagePath });
    res.json({ message: "Brand updated successfully" });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ message: "Error updating brand", error: err.message });
  }
};

// DELETE brand
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.delete(id);
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting brand", error: err.message });
  }
};

module.exports = { getBrands, createBrand, updateBrand, deleteBrand };