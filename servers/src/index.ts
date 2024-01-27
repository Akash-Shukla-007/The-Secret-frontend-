import express from "express";
const app = express();
require("dotenv").config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import notesRoutes from "./routes/notesRoutes";
var cors = require("cors");

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("", userRoutes);
app.use("", notesRoutes);
// app.get("/", (req: any, res: any) => {
//   res.send("ok");
//   console.log("ok");
// });

mongoose.set("strictQuery", true);
const dbUrl = "mongodb://127.0.0.1:27017/";
mongoose.connect(dbUrl + "server");
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
});
