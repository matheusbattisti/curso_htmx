const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { File } = require("../models");
const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  res.render("admin", { userId: req.session.userId });
});

// Rota para buscar arquivos do usuário
router.get("/fetch-files", isAuthenticated, async (req, res) => {
  try {
    const userFiles = await File.findAll({
      where: { userId: req.session.userId },
    });

    console.log(userFiles);

    // Aqui você pode renderizar os arquivos em HTML
    res.render("partials/userFiles", { files: userFiles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar arquivos");
  }
});

module.exports = router;
