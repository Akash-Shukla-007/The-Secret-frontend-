import User from "../Schema/userSchema";
import tokenGenerator from "./tokenGenerator";

const bcrypt = require("bcrypt");

const createUser = async (res: any, user: any) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUND || "10");
    user.password = bcrypt.hashSync(user.password, saltRounds);
    const data = new User(user);
    await data.save();

    const loginToken = tokenGenerator(user.email);
    res.status(201).json({
      token: loginToken,
      message: "Registered",
    });
  } catch (err: any) {
    res.status(500).json({ messsage: err.message });
  }
};
export default createUser;
