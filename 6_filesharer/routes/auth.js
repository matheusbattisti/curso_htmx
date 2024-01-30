const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models"); // ajuste o caminho conforme necessário
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("layout", { title: "Login", template: "login" });
});

router.get("/register", (req, res) => {
  res.render("layout", { title: "Registro", template: "register" });
});

// Rota de Registro
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const hashSenha = await bcrypt.hash(senha, 10);

  try {
    const newUser = await User.create({ nome, email, senha: hashSenha });

    // Autenticar o usuário após o registro
    req.session.userId = newUser.id; // Armazenar o ID do usuário na sessão

    console.log(newUser);

    res.setHeader("HX-Redirect", "/admin");

    res.send("Registro efetuado!");
  } catch (error) {
    res.send("Erro ao registrar o usuário.");
  }
});

// Rota de Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(senha, user.senha))) {
      req.session.userId = user.id; // Armazenar o ID do usuário na sessão

      res.setHeader("HX-Redirect", "/admin");

      res.send("Login efetuado!");
    } else {
      res.send("Falha no login: credenciais inválidas.");
    }
  } catch (error) {
    res.send("Erro no login.");
  }
});

// Rota de Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.setHeader("HX-Redirect", "/");

    res.send("Logout efetuado!");
  });
});

module.exports = router;
