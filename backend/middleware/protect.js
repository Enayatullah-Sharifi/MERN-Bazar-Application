import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../server/model/User.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Access denied!");
  }
  let user = await jwt.verify(token, process.env.JWT_SECRET);

  user = await User.findOne({ _id: user.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  req.user = user;

  next();
});

export default protect;
