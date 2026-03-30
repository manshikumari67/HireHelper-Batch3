const express = require("express");
const router = express.Router();
const { register, verifyOTP, login, resendOTP , getMe,  forgotPassword,
  resetPassword, deleteAccount} = require("../controllers/auth");
const { authMiddleware } = require("../middleware/auth");


router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);

router.get("/me",authMiddleware, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;
