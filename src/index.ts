import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import * as noteController from "./controllers/noteController.js";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.get("/", (_req, res) => {
  res.redirect("/notes");
});


app.get("/notes", noteController.getAllNotes);
app.post("/notes", noteController.saveNote);
app.get("/notes/create", noteController.createNote);
app.get("/notes/:id", noteController.getNoteById);
app.delete("/notes/:id", noteController.deleteNote);

const dbURI: string = "mongodb://admin:Ym2630318@localhost:27017/sticky-notes?authSource=admin";

mongoose.connect(dbURI, { serverSelectionTimeoutMS: 5000 })
  .then(() => app.listen(3000))
  .then(() => console.log("Server is running on port 3000"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
