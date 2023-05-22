import Notes from "../Schema/noteSchema";
import User from "../Schema/userSchema";

// Home Page
const home = async (req: any, res: any) => {
  try {
    // console.log(req.user)
    const notes = await Notes.find({ email: req.user.email }).exec();
    return res.status(200).json({ data: notes });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// Add Note
const addNote = async (req: any, res: any) => {
  try {
    const note = {
      email: req.user.email,
      title: req.body.title,
      description: req.body.description,
    };
    const notes = await Notes.create(note);
    await notes.save();
    return res.status(200).json({ note: note });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

//Edit Note
const editNote = async (req: any, res: any) => {
  try {
    const note = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
    };
    const notes = await Notes.findOneAndUpdate(
      { _id: note.id },
      { title: note.title, description: note.description },
      { new: true }
    );
    return res.status(200).json({ message: "updated " });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete-Note
const delteNote = async (req: any, res: any) => {
  try {
    const note = {
      id: req.body.id,
    };
    const notes = await Notes.findByIdAndDelete(note.id);

    return res.status(200).json({ message: "Deleted" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

//View Profile
const viewProfile = async (req: any, res: any) => {
  User.find({ email: req.user.email }, function (err: any, docs: any) {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ data: docs });
    }
  });
};

export { home, addNote, editNote, delteNote, viewProfile };
