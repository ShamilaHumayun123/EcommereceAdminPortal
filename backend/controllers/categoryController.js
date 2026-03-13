const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err });
  }
};

const createCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ message: "Id and Name required" });

    await Category.create({ id, name });
    res.status(201).json({ message: "Category created successfully" });
  } catch (err) {
  console.error("Backend error:", err); // <-- logs exact DB error
  res.status(500).json({ message: "Error creating brand", error: err.message });
}
};

module.exports = { getCategories, createCategory };