import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
const API_BASE_URL = "https://notesapp-r780.onrender.com/api/notes";

const NotesLayout = () => {
  const [notes, setNotes] = useState([]); // State For storing all the notes in an array format....

  const [editingNote, setEditingNote] = useState(null); // State For tracking which note is being edited..

  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch all notes...
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error while fetching notes", error);
    }
  };

  // updating notes....

  const handleUpdateNote = async (noteData) => {
    try {
      const noteId = notes[editingNote]._id;
      const response = await axios.put(
        `https://notesapp-r780.onrender.com/api/notes/${noteId}`,
        noteData
      );

      const updatedNotes = notes.map((note, index) =>
        index === editingNote ? response.data.data : note
      );
      setNotes(updatedNotes);
      setEditingNote(null);
    } catch (error) {
      console.error("Error while updating note", error);
    }
  };

  // Adding new note...

  const handleAddNote = async (noteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, noteData);
      setNotes([...notes, response.data.data]);
    } catch (error) {
      console.error("Error while adding note", error);
    }
  };

  // Handle edit..

  const handleEdit = (index) => {
    setEditingNote(index);
  };

  // Handle delete

  const handleDelete = async (index) => {
    try {
      const noteId = notes[index]._id;
      await axios.delete(`https://notesapp-r780.onrender.com/api/notes/${noteId}`);
      setNotes(notes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error while deleting note", error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-50 px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form section */}

        <div className="lg:col-span-4 w-full">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">
              {" "}
              {editingNote !== null ? "Edit note" : "Add New Note"}{" "}
            </h2>
            <NoteForm
              onSubmit={editingNote !== null ? handleUpdateNote : handleAddNote}
              initialData={editingNote !== null ? notes[editingNote] : null}
              onCancel={
                editingNote !== null ? () => setEditingNote(null) : null
              }
            />
          </div>
        </div>

        {/* Notes grid section */}

        <div className="lg:col-span-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                title={note.title}
                content={note.content}
                category={note.category}
                onEdit={() => {
                  handleEdit(index);
                }}
                onDelete={() => {
                  handleDelete(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesLayout;
