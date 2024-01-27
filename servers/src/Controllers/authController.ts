import User from "../Schema/userSchema";
import verifyOtp from "../services/VerifyOtp";
import authenticateUser from "../services/authenticateUser";
import createUser from "../services/createUser";
import tokenGenerator from "../services/tokenGenerator";
import createNewOtp from "../utilities/createOtp";
const bcrypt = require("bcrypt");
const axios = require("axios");

// Getting Started
const registerUser = async (req: any, res: any) => {
  const user = {
    email: req.body.email,
  };
  await User.exists({ email: user.email }, (err: any, docs: any) => {
    if (err) return console.log(err);
    if (docs) {
      res.status(409).json({ message: "User already Exists" });
      return;
    }
    res
      .status(200)
      .json({ message: "Allowed", hash: createNewOtp(user.email) });
  });
};

// sign-up
const signUp = async (req: any, res: any) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    otp: req.body.otp,
    hash: req.body.hash,
  };

  if (await verifyOtp(user)) {
    createUser(res, user);
    console.log("verified");

    return;
  }
  res.status(400).json({ message: "Otp doesn't match" });
};

// login

const login = async (req: any, res: any) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.findOne({ email: data.email });
  if (user) {
    authenticateUser(res, data.password, user);
  } else {
    res.status(409).json({ message: "Email and Password doesn't match" });
    console.log("not exists");
  }
};

//confirm-email
const confirmEmail = async (req: any, res: any) => {
  const user = {
    email: req.body.email,
    otp: req.body.otp,
    hash: req.body.hash,
  };
  if (await verifyOtp(user)) {
    const loginToken = tokenGenerator(user.email);
    res.status(200).json({ token: loginToken });
    return;
  }
  res.status(400).json({ message: "Enter correct OTP" });
  return;
};

//forgot password
const forgotPassword = async (req: any, res: any) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ hash: createNewOtp(user.email) });
    }
    return res.status(400).json({ message: "User does not exists" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

//new-pass
const newPass = async (req: any, res: any) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      token: req.body.token,
    };
    const saltRounds = parseInt(process.env.SALT_ROUND || "10");
    data.password = bcrypt.hashSync(data.password, saltRounds);
    const user = await User.findOneAndUpdate(
      { email: data.email },
      { password: data.password },
      { new: true }
    );
    return res.status(200).json({
      message: "Password Updated",
      user: user,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export { registerUser, login, signUp, forgotPassword, newPass, confirmEmail };
