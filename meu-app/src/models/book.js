const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, default: "Disponível" },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
