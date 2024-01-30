const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const app = express();
const port = 3000;

// Gerenciamento de sessão
app.use(
  session({
    store: new SQLiteStore(),
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
  })
);

// Configuração do EJS
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // para parsing do corpo da requisição

// Rotas
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.get("/", (req, res) => {
  res.render("layout", { title: "Home", template: "index" });
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
