const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const noteRoutes = require("./routes/noteRoute");
const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(noteRoutes);

//MongoDB connection
const dbURI = "";
mongoose
	.connect(dbURI)
	.then(() => app.listen(3000))
	.then(() => console.log("Server is running on port 3000"))
	.catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
	res.redirect("/notes");
});
