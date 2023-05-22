import User from "../Schema/userSchema";
import tokenGenerator from "./tokenGenerator";

const bcrypt = require("bcrypt");

const authenticateUser = async (
  res: any,
  enteredPassword: String,
  user: any
) => {
  try {
    if (await bcrypt.compareSync(enteredPassword, user.password)) {
      user.token = tokenGenerator(user.email);
      await user.save();
      res.status(201).json({ message: "login success", token: user.token });
    } else {
      res.status(400).json({ message: "Email and Password doesn't match" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export default authenticateUser;
