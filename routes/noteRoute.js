const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.get("/notes", noteController.getAllNotes);
router.get("/notes/create", noteController.createNote);
router.post("/notes", noteController.saveNote);
router.get("/notes/:id", noteController.getNoteById);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
