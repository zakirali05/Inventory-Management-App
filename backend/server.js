const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Productmodels");

app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);
try {
  mongoose.connect("mongodb://localhost:27017/test").then(() => {
    console.log("database connected");
  });
} catch (e) {
  console.log(e.message);
}

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/product/new", async (req, res) => {
  title = req.body.title;
  amount = req.body.amount;
  quantity = req.body.quantity;
  try {
    const product = await new Product({ title, amount, quantity });
    await product.save();
    res.json(product);
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/product/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id).exec();
    res.json({ message: "Product deleted succesfully !!!" });
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(3001, () => {
  console.log("server started !!");
});
