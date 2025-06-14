const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET
  );
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});
// generate otp and send to user email
let optStore = {};
const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered", success: false });
    }
    // generate otp
    const generatedOTP = Math.floor(100000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 mins
    // save otp
    optStore[email] = {
      otp: generatedOTP,
      expiry: otpExpiry,
    };
    // delete otp after 10 mins
    setTimeout(() => {
      delete optStore[email];
    }, 10 * 60 * 1000);
    // send otp to user email
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "OTP for Registration",
      html: `<div>
            <h3>Hello,</h3>
            <p>Your OTP for registration is: <strong>${generatedOTP}</strong></p>
            <p>This OTP is valid for 10 minutes.</p>
            <p>Thank you.</p>
            </div>
            `,
    });
    res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// verify otp and create a new user
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered", success: false });
    }
    // check otp
    if (otp !== optStore[email].otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    // check otp expiry
    if (optStore[email].expiry < new Date()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }
    res
      .status(200)
      .json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const registered = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered", success: false });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // generate token
    const token = generateToken(newUser);
    res.status(200).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
      token,
    });
    // delete otp from store
    delete optStore[email];
  } catch (error) {
    res.status(400).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User Not Found", success: false });
    // compare password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res
        .status(400)
        .json({ message: "Invalid Password", success: false });

    // generate token
    const token = generateToken(user);
    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", token, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

// forgot password send link to user email
const forgotPassword = async (req, res) => {
  try {
    // check user exists or not
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User Not Found", success: false });
    // generate token
    const token = generateToken(user);
    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;
    // send reset link to user email

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Reset Password Link",
      text: `Hello ${user.name},
            Please click on the link to reset your password: ${resetLink}
            This link expires in 1 hour.
            Thank you.`,
    });
    res.status(200).json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!newPassword)
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(400).json({ message: "Invalid Token", success: false });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(decoded.userId, {
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  verifyOTP,
  generateOTP,
  registered,
};
