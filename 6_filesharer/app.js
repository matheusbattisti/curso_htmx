const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "segredo",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
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
  res.render("index");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
