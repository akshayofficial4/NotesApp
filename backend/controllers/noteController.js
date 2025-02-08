const Note = require("../models/Note");

//Creating a new note...

exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body; // Extracted data from the body...

    // creating new note...

    const newNote = await Note.create({
      title,
      content,
      category,
    });
    res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    rea.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all notes...

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Updating Notes...

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Deleting notes...

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
