import jwt from "jsonwebtoken";
async function generateTokenAndSetCookies(res, user) {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_MAX_AGE,
  });

  res.cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
}

export default generateTokenAndSetCookies
