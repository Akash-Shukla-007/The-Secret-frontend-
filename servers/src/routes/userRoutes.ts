import {
  confirmEmail,
  forgotPassword,
  login,
  newPass,
  registerUser,
  signUp,
} from "../Controllers/authController";

const express = require("express");
const router = express.Router();

router.post("/getting-started", registerUser);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/confirm-email", confirmEmail);
router.post("/new-pass", newPass);

export default router;
