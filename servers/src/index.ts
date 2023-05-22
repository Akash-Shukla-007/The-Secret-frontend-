import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./Schema/userSchema";
import createNewOtp from "./utilities/createOtp";
import verifyOtp from "./services/VerifyOtp";
import createUser from "./services/createUser";
import authenticateUser from "./services/authenticateUser";
import tokenGenerator from "./services/tokenGenerator";
import AuthMiddleware from "./Middlewares/authMiddleware";
import Notes from "./Schema/noteSchema";
import userRoutes from "./routes/userRoutes";
import notesRoutes from "./routes/notesRoutes";

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("", userRoutes);
app.use("", notesRoutes);

mongoose.set("strictQuery", true);
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl + "server");
const db = mongoose.connection;
db.on("error", (err) => console.log("err", err));
db.once("open", () => {
  console.log("database connected");
  app.listen(8000, () => {
    console.log("server running");
  });
});
