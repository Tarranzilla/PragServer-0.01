/* ================ Dependencias ================ */

const express = require("express");
const path = require("path");
const cors = require("cors");

/* App se torna uma instancia de express */
const app = express();

/* ================ Configurações ================ */

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//app.use(cors());
//app.use(getWeather);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ================ Middlewares ================ */

const getWeather = (req, res, next) => {
    req.weather = true;
    next();
};

/* ================ Rotas ================ */

/* Rotas raiz */
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

/* Rotas sobre */
app.get("/sobre", getWeather, (req, res) => {
    res.send(`
    <h1>Sobre o PragServer!</h1>
    <p>${req.weather ? "Hoje está chovendo!" : "Hoje está sol!"}</p>
    `);
});

/* Rotas cor */
app.get("/cor", (req, res) => {
    res.send("Você não escolheu uma cor!");
});

app.post("/cor", (req, res) => {
    if (req.body.cor.trim().toUpperCase() === "VERMELHO") {
        res.send("Que cor Revolucionaria!");
    } else if (req.body.cor.trim().toUpperCase() == "AZUL") {
        res.send("Que cor de céu!");
    } else if (req.body.cor.trim().toUpperCase() == "VERDE") {
        res.send("Que cor de natureza!");
    } else {
        res.send("Que cor interessante!");
    }
});

/* ================ Porta do Servidor ================ */

app.listen(3030);
