import jwt from "jsonwebtoken";
import { generateToken } from "./token.js";


export const sendTokenResponse = (user, res, message = "Success") => {
  // 1. Generate JWT token
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRE || "7d",
  // });
    const token = generateToken(user._id);


  // 2. Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only HTTPS in prod
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };

  // 3. Send response
  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          profileCompleted: user.profileCompleted,
        },
        token,
      },
    });
};
