const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

// Para CORS
app.use(cors());

// Para dados de formulário
app.use(express.urlencoded({ extended: true }));

// Para JSON
app.use(express.json());

const content = "<p>Conteúdo carregado dinamicamente.</p>";
const newContent = "<p>Novo conteúdo substituído.</p>";

app.get("/content", (req, res) => {
  res.send(content);
});

app.get("/newContent", (req, res) => {
  res.send(newContent);
});

app.get("/outOfBound", (req, res) => {
  res.send(
    '<div id="notification" hx-swap-oob="true">Notificação atualizada!</div>'
  );
});

app.get("/subset", (req, res) => {
  res.send(`
        <div id="only-this-part">Esta parte será carregada.</div>
        <div>Esta parte será ignorada.</div>
    `);
});

app.get("/advancedParams", (req, res) => {
  const lang = req.query.lang[0];
  const user = req.query.user[0];

  res.send(`Parâmetros recebidos: lang = ${lang}, user = ${user}`);
});

app.get("/userData", (req, res) => {
  const userData = {
    name: "John Doe",
    age: 30,
    location: "Brasil",
  };
  res.json(userData);
});

app.get("/lazyImage", (req, res) => {
  res.send('<img src="https://via.placeholder.com/500">');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
