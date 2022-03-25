import express from "express";
import data from "../data";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";

const userRouter = express.Router();
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);
export default userRouter;
