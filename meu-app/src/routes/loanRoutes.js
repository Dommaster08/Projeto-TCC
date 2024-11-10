const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan");

// Listar todos os empréstimos
router.get("/list", async (req, res) => {
  try {
    const loans = await Loan.find().populate("user").populate("book");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar empréstimos" });
  }
});

// Registrar um novo empréstimo
router.post("/add", async (req, res) => {
  const { user, book, dueDate } = req.body;

  if (!user || !book || !dueDate) {
    return res
      .status(400)
      .json({ message: "Usuário, livro e data de devolução são obrigatórios" });
  }

  try {
    // Cria o novo empréstimo
    const newLoan = new Loan({ user, book, dueDate });
    await newLoan.save();
    res.status(201).json({ message: "Empréstimo registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar empréstimo:", error);
    res.status(500).json({ message: "Erro ao registrar empréstimo", error });
  }
});

// Concluir empréstimo
router.delete("/:id", async (req, res) => {
  try {
    const loanId = req.params.id;
    await Loan.findByIdAndDelete(loanId);
    res.status(200).send("Empréstimo deletado com sucesso");
  } catch (error) {
    res.status(500).send("Erro ao deletar empréstimo");
  }
});

// Obter relatórios de empréstimos
router.get("/total-loans", async (req, res) => {
  try {
    // Contar o total de empréstimos
    const totalLoans = await Loan.countDocuments();

    // Responder com o total de empréstimos
    res.status(200).json({ totalLoans });
  } catch (error) {
    console.error("Erro ao obter o total de empréstimos:", error);
    res.status(500).send("Erro ao obter o total de empréstimos");
  }
});

module.exports = router;
