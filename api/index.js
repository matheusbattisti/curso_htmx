const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const port = 3000;

// Configuração do Multer (por exemplo, armazenar arquivos na pasta 'uploads')
const upload = multer({ dest: "uploads/" });

// Para CORS
app.use(cors());

// Para dados de formulário
app.use(express.urlencoded({ extended: true }));

// Para JSON
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World HTMX!");
});

// Aula 1: Requisição HTTP (hx-get com post)
app.post("/post", (req, res) => {
  res.send("Requisição POST recebida!");
});

// Aula 2: Continuando com Put e Delete
app.put("/put", (req, res) => {
  res.send("Requisição PUT recebida!");
});

app.delete("/delete", (req, res) => {
  res.send("Requisição DELETE recebida!");
});

// Aula 3: Gatilho de Requisição (hx-trigger)
app.get("/trigger", (req, res) => {
  res.send("Resposta do gatilho de requisição.");
});

// Aula 4: Modificador de Trigger (evento once, delay e evento por outro elemento)
app.get("/once", (req, res) => {
  res.send("Ação executada uma vez.");
});

app.get("/delay", (req, res) => {
  res.send("Ação com delay.");
});

app.get("/external", (req, res) => {
  res.send("Requisição acionada por outro elemento.");
});

// Aula 5: Filtros de Trigger
app.get("/control-click", (req, res) => {
  res.send("Botão clicado com a tecla Control pressionada.");
});

app.get("/global-condition", (req, res) => {
  res.send("Condição global atendida para acionar a requisição.");
});

// Aula 6: Eventos Especiais (load, revealed, intersect, threshold)
app.get("/load", (req, res) => {
  res.send("Conteúdo carregado no evento Load.");
});

app.get("/revealed", (req, res) => {
  res.send("Conteúdo carregado quando Revelado.");
});

// Aula 7: Polling
app.get("/polling", (req, res) => {
  res.send(`Atualizado em: ${new Date().toLocaleTimeString()}`);
});

// Aula 8: Indicador de Progresso com HTMX
app.get("/progress", (req, res) => {
  setTimeout(() => {
    // Simula um atraso
    res.send("Conteúdo Carregado.");
  }, 3000);
});

// Aula 9: Enviando Dados
app.post("/submit", (req, res) => {
  // Processamento dos dados do formulário
  const nome = req.body.nome;
  const email = req.body.email;
  res.send(`Formulário recebido: Nome - ${nome}, Email - ${email}`);
});

// Aula 10: Mensagem de Confirmação
app.delete("/delete", (req, res) => {
  res.send("Item deletado com sucesso.");
});

// Aula 11: Upload de Arquivos
// Certifique-se de ter o middleware apropriado para o tratamento de upload de arquivos
app.post("/upload", upload.single("arquivo"), (req, res) => {
  console.log("aqui");
  console.log(req.file); // Informações do arquivo carregado
  res.send("Arquivo recebido!");
});

// Aula 12: Sincronizando Requisições
app.get("/getData", (req, res) => {
  setTimeout(() => {
    res.send("Resposta da Requisição GET");
  }, 3000);
});

app.post("/postData", (req, res) => {
  res.send("Resposta da Requisição POST");
});

// Aula 13: Cancelando Requisições
app.get("/long-request", (req, res) => {
  setTimeout(() => {
    res.send("Resposta de uma longa requisição.");
  }, 10000); // Simula uma requisição longa
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
