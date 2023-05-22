import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Notes = mongoose.model("Notes", noteSchema);

export default Notes;
