const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Adicionar um livro
router.post("/add", async (req, res) => {
  const { title, author, year } = req.body;
  try {
    const newBook = new Book({ title, author, year });
    await newBook.save();
    res.status(201).json({ message: "Livro adicionado com sucesso", newBook });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar o livro" });
  }
});

// Listar todos os livros
router.get("/list", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os livros" });
  }
});

// Atualizar um livro
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year, status } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, year, status },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Livro atualizado com sucesso", updatedBook });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o livro" });
  }
});

// Deletar um livro
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o livro" });
  }
});

module.exports = router;
