import {
  addNote,
  delteNote,
  editNote,
  home,
  viewProfile,
} from "../Controllers/notesController";
import AuthMiddleware from "../Middlewares/authMiddleware";

const express = require("express");
const router = express.Router();

router.get("/default", AuthMiddleware, home);
router.post("/add-note", AuthMiddleware, addNote);
router.post("/edit-note", AuthMiddleware, editNote);
router.post("/delete-note", AuthMiddleware, delteNote);
router.get("/profile", AuthMiddleware, viewProfile);

export default router;
