const Note = require("../models/Notes");

// Get all notes
const getAllNotes = (req, res) => {
	Note.find()
		.then((notes) => {
			res.render("Notes", { notes });
		})
		.catch((err) => {
			console.error("Error fetching notes:", err);
			res.status(500).send("Error fetching notes");
		});
};

// Create and save a new note
const createNote = (req, res) => {
	res.render("Create");
};

const saveNote = (req, res) => {
	const note = new Note({
		title: req.body.title,
		content: req.body.content,
	});
	note
		.save()
		.then(() => {
			res.redirect("/notes");
		})
		.catch((err) => {
			console.error("Error creating note:", err);
			res.status(500).send("Error creating note");
		});
};

// Get a single note by ID
const getNoteById = (req, res) => {
	Note.findById(req.params.id)
		.then((note) => {
			if (!note) {
				return res.status(404).send("Note not found");
			}
			res.render("Note", { note });
		})
		.catch((err) => {
			console.error("Error fetching note:", err);
			res.status(500).send("Error fetching note");
		});
};

// Delete a note by ID

const deleteNote = (req, res) => {
	Note.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({ message: "Note deleted successfully" });
		})
		.catch((err) => {
			console.error("Error deleting note:", err);
			res.status(500).json({ error: "Error deleting note" });
		});
};

module.exports = {
	getAllNotes,
	createNote,
	saveNote,
	getNoteById,
	deleteNote,
};
