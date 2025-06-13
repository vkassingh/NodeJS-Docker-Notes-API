const Note = require('../models/Note');
const { suggestNoteTags } = require('../services/geminiService'); // Import Gemini service

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        // Use Gemini to suggest tags based on note content
        const suggestedTags = await suggestNoteTags(content);

        const newNote = new Note({
            title,
            content,
            tags: suggestedTags, // Assign suggested tags
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Server error: Could not create note.' });
    }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Server error: Could not retrieve notes.' });
    }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error('Error fetching note by ID:', error);
        res.status(500).json({ message: 'Server error: Could not retrieve note.' });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updates = { title, content };

        // If content is updated, re-suggest tags
        if (content) {
            updates.tags = await suggestNoteTags(content);
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Server error: Could not update note.' });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Server error: Could not delete note.' });
    }
};