const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); 
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});