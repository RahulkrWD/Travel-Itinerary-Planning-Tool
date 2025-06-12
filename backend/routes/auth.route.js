const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// rate limit
const otpLimiter = rateLimit({
  windowMs: 15 *  60 * 1000, // 15 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many OTP requests from this IP, please try again later"
  }
});

router.post("/generate-otp", otpLimiter, authController.generateOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/user/:id", authMiddleware, authController.getUserById);

module.exports = router;