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

// Rota para a Aula 1: Evento de Carregamento de Página
app.get("/loadPage", (req, res) => {
  res.send(
    "<p>Conteúdo carregado para o evento de carregamento da página.</p>"
  );
});

// Rota para a Aula 2: Ações Antes e Depois de um Swap
app.get("/beforeAfterSwap", (req, res) => {
  res.send("<p>Conteúdo carregado para o evento de swap.</p>");
});

// Rota para a Aula 3: Ações Antes e Depois de um Request
app.get("/beforeAfterRequest", (req, res) => {
  res.send("<p>Conteúdo carregado para o evento de requisição.</p>");
});

// Rota que intencionalmente falha para a aula de tratamento de falha na requisição
app.get("/endpointQueFalha", (req, res) => {
  res.status(500).send("Falha intencional do servidor.");
});

// Rota para a aula de interceptação de request
app.get("/endpointParaInterceptar", (req, res) => {
  // Exibir todos os cabeçalhos da requisição recebida no console do servidor
  console.log("Cabeçalhos Recebidos:", req.headers);

  // Exibir os parâmetros de consulta (query) recebidos no console do servidor
  console.log("Parâmetros de Consulta Recebidos:", req.query);

  // Responder com uma mensagem contendo os valores recebidos
  res.send(
    `Cabeçalhos e parâmetros de consulta recebidos. Veja o console do servidor para detalhes.`
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
