import express from "express";
import mongoose from "mongoose";
import data from "./data";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect("mongodb://localhost/amazoona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});
const port = 2022;
app.listen(2022, () => {
  console.log(`Server at http://localhost:${port}`);
});
