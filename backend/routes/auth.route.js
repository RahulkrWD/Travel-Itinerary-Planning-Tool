const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controler");
const authMiddleware = require("../middleware/auth.middleware");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// rate limit
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many OTP requests from this IP, please try again later",
  },
});

router.post("/generate-otp", otpLimiter, authController.generateOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/signup", authController.registered);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/user", authMiddleware, userController.getUser);
router.patch("/user", authMiddleware, userController.updateUser);
router.post("/address", authMiddleware, userController.addAddress);
router.get("/address", authMiddleware, userController.getAddress);
router.delete(
  "/address/:addressId",
  authMiddleware,
  userController.deleteAddress
);
router.patch(
  "/address/:addressId",
  authMiddleware,
  userController.updateAddress
);

module.exports = router;
