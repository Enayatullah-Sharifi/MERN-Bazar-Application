import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Item from "../model/Item.js";

// @desc    Get All Users
// @route   GET   /api/users
// @access  Private (admin)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "seller" });

  if (!users) {
    res.status(404);
    throw new Error(`User not found`);
  }

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get Single User
// @route   Get   /api/users/:id
// @access  Private (admin)
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.status(404);
    throw new Error(`No user found `);
  }
  const { password, ...rest } = user._doc;

  res.status(200).json({
    success: true,
    data: rest,
  });
});

// @desc    Update User
// @route   PUT   /api/users/:id
// @access   Private (admin)
export const updateUser = asyncHandler(async (req, res) => {
  const filename = req.file?.filename;
  const { username, newPassword } = req.body;

  let user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.status(404);
    throw new Error(`User not found `);
  }

  user = await User.findByIdAndUpdate(
    user.id,
    {
      $set: {
        username: username ? username : user.username,
        password: newPassword
          ? await bcrypt.hash(newPassword, 10)
          : user.password,
        img: filename !== undefined ? filename : user.img,
      },
    },
    {
      new: true,
    }
  );

  const { password: pass, ...rest } = user._doc;
  res.status(200).json({
    success: true,
    message: "User updated successfully!",
    data: rest,
  });
});

// @desc    Delete User
// @route   DELETE    /api/users/:id
// @access  Private (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  await Item.deleteMany({ user: user._id });

  if (!user) {
    res.status(404);
    throw new Error(`No user found delete`);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
    data: user._id,
  });
});

// @desc    Block User
// @route   POST    /api/users/:id/block
// @access  Private
export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { isBlocked: req.query.isBlocked } },
    {
      new: true,
    }
  );

  if (!user) {
    res.status(400);
    throw new Error("Error occured while blocking user");
  }

  res.status(200).json({
    success: true,
    data: `User status changed...`,
  });
});

// @desc  Get users profile
// @route GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  const { password, ...rest } = user._doc;
  res.status(200).json({
    success: true,
    data: rest,
  });
});
