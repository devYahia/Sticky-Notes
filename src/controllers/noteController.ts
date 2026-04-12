import type { Request, Response } from "express";
import Note, { type INote } from "../models/schema.js";

// Get all notes
const getAllNotes = (req: Request, res: Response): void => {
	Note.find().sort({ createdAt: -1 })
		.then((notes: INote[]) => {
			res.render("Notes", { notes });
		})
		.catch((err: Error) => {
			console.error("Error fetching notes:", err);
			res.status(500).send("Error fetching notes");
		});
};

// Create and save a new note
const createNote = (req: Request, res: Response): void => {
	res.render("Create");
};

const saveNote = (req: Request, res: Response): void => {
	const newNote = new Note({
		title: req.body.title,
		content: req.body.content,
	});
	newNote
		.save()
		.then((): void => {
			res.redirect("/notes");
		})
		.catch((err: Error): void => {
			console.error("Error creating note:", err);
			res.status(500).send("Error creating note");
		});
};

// Get a single note by ID
const getNoteById = (req: Request, res: Response): void => {
	Note.findById(req.params.id)
		.then((foundNote: INote | null): void => {
			if (!foundNote) {
				res.status(404).send("Note not found");
				return;
			}
			res.render("Note", { note: foundNote });
		})
		.catch((err: Error): void => {
			console.error("Error fetching note:", err);
			res.status(500).send("Error fetching note");
		});
};

// Delete a note by ID
const deleteNote = (req: Request, res: Response): void => {
	Note.findByIdAndDelete(req.params.id)
		.then((): void => {
			res.json({ message: "Note deleted successfully" });
		})
		.catch((err: Error): void => {
			console.error("Error deleting note:", err);
			res.status(500).json({ error: "Error deleting note" });
		});
};

export {
	getAllNotes,
	createNote,
	saveNote,
	getNoteById,
	deleteNote,
};