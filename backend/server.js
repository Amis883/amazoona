import express from "express";
import data from "./data.js";
const app = express();
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/", (req, res) => {
  res.send("Server is ready");
});
const port = 2022;
app.listen(2022, () => {
  console.log(`Server at http://localhost:${port}`);
});
