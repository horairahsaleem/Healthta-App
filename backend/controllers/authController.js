import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/sendEmail.js";
import { sendTokenResponse } from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

// ========== Signup ==========
import crypto from "crypto";

export const signup = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, title, city, email, phoneNumber, biologicalSex, language, password } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) return next(new ErrorHandler("User already exists with this email", 400));

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate verification token (random string)
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationExpires = Date.now() + 1000 * 60 * 60; // 1 hour

  const user = await User.create({
    firstName,
    lastName,
    title,
    city,
    email: email.toLowerCase(),
    phoneNumber,
    biologicalSex,
    language: language || "English",
    password: hashedPassword,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: verificationExpires,
    isVerified: false,
  });

  // Send only verification email
  await sendVerificationEmail(user.email, verificationToken);

  res.status(201).json({
    success: true,
    message: "Account created successfully. Please verify your email before logging in.",
  });
});


// ========== Login ==========
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ErrorHandler("Please provide email and password", 400));

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Invalid email or password", 401));

  if (!user.isActive) return next(new ErrorHandler("Account has been deactivated", 401));

  sendTokenResponse(user, res, "Login successful");
});

// ========== Social Login ==========
export const socialLogin = catchAsyncError(async (req, res, next) => {
  const { provider, socialId, email, firstName, lastName } = req.body;
  if (!provider || !socialId || !email) return next(new ErrorHandler("Provider, socialId, and email are required", 400));

  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    if (provider === "google" && !user.googleId) user.googleId = socialId;
    if (provider === "facebook" && !user.facebookId) user.facebookId = socialId;

    user.isVerified = true;
    user.emailVerified = true;
    await user.save();
  } else {
    user = await User.create({
      email: email.toLowerCase(),
      firstName: firstName || "Social",
      lastName: lastName || "User",
      title: "Mr",
      city: "Unknown",
      phoneNumber: "+0000000000",
      biologicalSex: "Other",
      language: "English",
      role: "patient",
      isVerified: true,
      emailVerified: true,
      googleId: provider === "google" ? socialId : undefined,
      facebookId: provider === "facebook" ? socialId : undefined,
    });
  }

  sendTokenResponse(user, res, "Social login successful");
});

// ========== Verify Email ==========
export const verifyEmail = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) return next(new ErrorHandler("Invalid verification token", 400));

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
sendWelcomeEmail(user)
  // Redirect user to frontend login page
  // res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);  // only when you have login page 
res.json({
  success: true,
  message: 'Email verified successfully',
  user: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified
  }
});  // temporary
});
