const express = require("express");
var cors = require('cors')
const PORT = 6663;
const app = express();
app.use(express.json());

const article = require('./routes/article')
const boutique = require('./routes/boutique')
const client = require('./routes/client')
const commande = require('./routes/commande')

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(corsOptions))

app.use('/article', article);
app.use('/boutique', boutique);
app.use('/client', client);
app.use('/commande', commande);

app.get("/", (req, res) => {
  res.json({ message: "Bienvennu dans mon API de gestion de boutique en ligne" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});