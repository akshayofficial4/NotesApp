const express = require("express");
const router = express.Router();

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// Route for getting all notes...

router.get("/", getNotes);

// Route for creating a note...

router.post("/", createNote);

// Route for updating a note...

router.put("/:id", updateNote);

// Route for deleting a note...

router.delete("/:id", deleteNote);

module.exports = router;
