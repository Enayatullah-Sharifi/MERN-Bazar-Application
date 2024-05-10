import asyncHandler from "express-async-handler";
import User from "../server/model/User.js";

const adminRoute = asyncHandler(async (req, res, next) => {
  let user = req.user._id;
  user = await User.findOne({ _id: user });
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }

  if (user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied");
  }

  next();
});

export default adminRoute;
