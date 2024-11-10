const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Rota para listar usuários
router.get("/list", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

// Rota para adicionar um novo usuário
router.post("/add", async (req, res) => {
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: "Nome e contato são obrigatórios" });
  }

  try {
    const newUser = new User({ name, contact });
    await newUser.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar usuário" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: "Nome e contato são obrigatórios" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, contact },
      { new: true } // Retorna o usuário atualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário atualizado com sucesso!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});

// Excluir usuário
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário" });
  }
});

module.exports = router;
