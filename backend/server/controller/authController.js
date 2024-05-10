import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import {
  registerFormValidation,
  loginFormValidation,
} from "../../utils/formValidation.js";
import generateTokenAndSetCookies from "../../utils/generateTokenAndSetCookie.js";
import sendEmail from "../../middleware/sendEmail.js";
import Token from "../model/Token.js";
import crypto from "crypto";

// @desc    Register user
// @route   POST    api/auth/register
// @access  public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const { valid, errors } = registerFormValidation(
    username,
    email,
    password,
    confirmPassword
  );

  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors));
  } else {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error(`User already exist!`);
    }

    user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;
      await sendEmail(
        user.email,
        "Click the link to verify your email account",
        url
      );

      res.status(201).json({
        success: true,
        message: "A verification link sent to your email",
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  }
});

// @desc      Login user
// @route     POST   /api/auth/login
// @access    public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { valid, errors } = loginFormValidation(email, password);

  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors));
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
    }
    const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;
    await sendEmail(
      user.email,
      "Click the link to verify your email account",
      url
    );

    return res.status(400).json({
      success: true,
      message: "A link set to your email please verify it",
    });
  }

  await generateTokenAndSetCookies(res, user);
  const { password: pass, ...rest } = user._doc;

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: rest,
  });
});

// @desc      Verify user
// @route     get   /api/auth/user/:userId/verify/:token
// @access    public
export const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) {
    res.status(404);
    throw new Error("Invalid Link");
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) {
    res.status(400);
    throw new Error("Invalid Link");
  }

  await User.findByIdAndUpdate(user._id, { $set: { verified: true } });
  await Token.deleteOne({ _id: token._id });
  res.status(200).json({
    success: true,
    message: "Email verified successfully!",
  });
});

// @desc      Login user
// @route     POST   /api/auth/logout
// @access    public
export const logout = asyncHandler(async (req, res) => {
  res.status(200).cookie("token", "", { maxAge: -1, httpOnly: true }).json({
    success: true,
    message: "Logged out successfully",
    data: null,
  });
});
