import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import notesRoutes from "./routes/notesRoutes";

const app = express();
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
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("Database connected");
  app.listen(8000, () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
});
