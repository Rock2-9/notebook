const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
//Router 1 to Fetch All notes: Log in compulsory
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
//Router 2 to add Notes
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least of 5 character").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
// Router 3 to Update Notes : Log in compulsory
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNotes = {};
  if (title) {
    newNotes.title = title;
  }
  if (description) {
    newNotes.description = description;
  }
  if (tag) {
    newNotes.tag = tag;
  }

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(400).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id, newNotes, { new: true });
  res.json(note);
});
//Router 4 to Delete Notes : Log in compulsory
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(400).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json("note is deleted");
});
