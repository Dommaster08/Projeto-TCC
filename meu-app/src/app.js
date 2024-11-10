const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const loanRoutes = require("./routes/loanRoutes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

try {
  mongoose.connect(
    "mongodb+srv://user001:user001@tecaweb.ui5kx.mongodb.net/?retryWrites=true&w=majority&appName=tecaweb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Conectado ao MongoDB");
} catch (error) {
  console.error("Erro ao conectar ao MongoDB:", error);
}

app.use(express.json());

app.use(cors());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
