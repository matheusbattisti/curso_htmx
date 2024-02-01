const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const port = 3000;

const app = express();

app.use(cors());

// Para dados de formulário
app.use(express.urlencoded({ extended: true }));

// Para JSON
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

const Todo = sequelize.define("Todo", {
  texto: DataTypes.STRING,
  dificuldade: DataTypes.STRING,
  completa: DataTypes.BOOLEAN,
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});

app.post("/todos", async (req, res) => {
  const { texto, dificuldade } = req.body;
  if (!texto || !dificuldade) {
    res.send(
      '<div class="alert alert-danger" role="alert">Texto e dificuldade são obrigatórios.</div>'
    );
    return;
  }
  try {
    const novaTarefa = await Todo.create({
      texto,
      dificuldade,
      completa: false,
    });
    res.send(
      `<div class="alert alert-success" role="alert">Tarefa '${novaTarefa.texto}' criada com sucesso.</div>`
    );
  } catch (error) {
    res.send(
      '<div class="alert alert-danger" role="alert">Erro ao criar a tarefa.</div>'
    );
  }
});

app.get("/todos", async (req, res) => {
  try {
    const tarefas = await Todo.findAll();

    if (tarefas.length === 0) {
      res.send("<p>Não há tarefas!</p>");

      return;
    }

    let html = tarefas
      .map(
        (tarefa) =>
          `<div class="card mb-3 ${
            tarefa.completa ? "bg-light border-success" : ""
          }">
        <div class="card-body ${tarefa.completa ? "font-italic" : ""}">
            <h5 class="card-title">Tarefa: ${tarefa.texto}</h5>
            <p class="card-text">Dificuldade: ${tarefa.dificuldade}</p>
            <p class="card-text">Status: ${
              tarefa.completa ? "Completa" : "Incompleta"
            }</p>
            <button class="btn btn-primary" onclick="editarTarefa(${
              tarefa.id
            }, '${tarefa.texto}', '${tarefa.dificuldade}')">Editar</button>
            <button class="btn btn-danger" onclick="deletarTarefa(${
              tarefa.id
            })">Deletar</button>
            <button class="btn btn-secondary" onclick="toggleTarefa(${
              tarefa.id
            })">${
            tarefa.completa ? "Desmarcar" : "Marcar"
          } como Completa</button>
        </div>
    </div>`
      )
      .join("");

    res.send(html);
  } catch (error) {
    res.send("Erro ao buscar tarefas.");
  }
});

app.put("/todos", async (req, res) => {
  const { id, texto, dificuldade } = req.body;
  if (!texto || !dificuldade) {
    return res.send("Texto e dificuldade são obrigatórios.");
  }
  try {
    const tarefa = await Todo.findByPk(id);
    if (tarefa) {
      await tarefa.update({ texto, dificuldade });
      res.send(
        `<div class="alert alert-success" role="alert">Tarefa '${tarefa.texto}' atualizada com sucesso.</div>`
      );
    } else {
      res.send("Tarefa não encontrada.");
    }
  } catch (error) {
    res.send("Erro ao atualizar a tarefa.");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const tarefa = await Todo.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.destroy();
      res.send(
        `<div class="alert alert-success" role="alert">Tarefa deletada com sucesso.</div>`
      );
    } else {
      res.send("Tarefa não encontrada.");
    }
  } catch (error) {
    res.send("Erro ao deletar a tarefa.");
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const tarefa = await Todo.findByPk(req.params.id);
    if (tarefa) {
      tarefa.completa = !tarefa.completa;
      await tarefa.save();
      res.send(
        `<div class="alert alert-info" role="alert">Tarefa '${
          tarefa.texto
        }' marcada como ${tarefa.completa ? "completa" : "incompleta"}.</div>`
      );
    } else {
      res.send("Tarefa não encontrada.");
    }
  } catch (error) {
    res.send("Erro ao atualizar o status da tarefa.");
  }
});
