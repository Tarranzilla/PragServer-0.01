/* ================ Dependencias ================ */

const express = require("express");

/* App se torna uma instancia de express */
const app = express();

/* ================ Configurações ================ */

app.use(express.urlencoded({ extended: false }));

/* ================ Middlewares ================ */

const getWeather = (req, res, next) => {
    req.weather = true;
    next();
};

/* ================ Rotas ================ */

/* Rotas raiz */
app.get("/", (req, res) => {
    res.send(`
        <h1>PragServer</h1>
        <p>Seja bem vindo ao PragServer!</p>
        <br>
        <a href="/sobre">Sobre</a>
        <br>
        <p>Escolha uma cor:</p>
        <form action="/cor" method="POST">
            <input type="text" name="cor" placeholder="Cor">
            <button type="submit">Enviar</button>
        </form>
        `);
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
