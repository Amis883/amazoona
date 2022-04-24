import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import path from "path";

dotenv.config();
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
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/amazon/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/amazon/build/index.html"))
);
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });
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
