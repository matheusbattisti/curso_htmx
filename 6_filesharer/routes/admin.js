const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../config/multerConfig");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const { File } = require("../models");
const { User } = require("../models");

router.get("/", isAuthenticated, async (req, res) => {
  res.render("layout", {
    title: "Admin",
    template: "admin",
    userId: req.session.userId,
    files: [],
  });
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

// Rota de upload
router.post("/upload", upload.single("arquivo"), async (req, res) => {
  try {
    // Salvar informações do arquivo no banco de dados
    await File.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
      caminho: req.file.path,
      userId: req.session.userId,
    });

    // Buscar e enviar a lista atualizada de arquivos
    const userFiles = await File.findAll({
      where: { userId: req.session.userId },
    });
    res.render("partials/userFiles", { files: userFiles });
  } catch (error) {
    res.status(500).send("Erro ao enviar arquivo.");
  }
});

router.delete("/delete-file/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).send("Arquivo não encontrado.");
    }

    // Excluir o arquivo do sistema de arquivos, se necessário
    const filePath = path.join(__dirname, "..", "uploads", file.caminho);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Excluir o registro do arquivo no banco de dados
    await file.destroy();

    // Buscar e enviar a lista atualizada de arquivos
    const userFiles = await File.findAll({
      where: { userId: req.session.userId },
    });
    res.render("partials/userFiles", { files: userFiles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir o arquivo.");
  }
});

// Rota para listar arquivos de todos os usuários
router.get("/all-files", isAuthenticated, async (req, res) => {
  res.render("layout", {
    title: "Biblioteca de arquivos",
    template: "allfiles",
    userId: req.session.userId,
    files: [],
  });
});

router.get("/all-files/data", isAuthenticated, async (req, res) => {
  try {
    const allFiles = await File.findAll({
      include: [
        {
          model: User,
          attributes: ["nome"],
        },
      ],
    });

    res.render("partials/allFilesList", { files: allFiles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar arquivos.");
  }
});

module.exports = router;
