import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const connectDB = async () => {
  try {
    //database Name
    const databaseName = "amazoona";
    const con = await mongoose.connect(
      `mongodb://127.0.0.1:27888/${databaseName}`,
      {
        authSource: "admin",
        user: "mongoadmin",
        pass: "secret",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

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
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 2022;
try {
  (async () => {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server at http://localhost:${port}`);
    });
  })();
} catch (e) {
  console.log(e);
}
