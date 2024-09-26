const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

require('./database')

const app = express();

app.use(cors({
    origin: '*', // Substitua pela URL que você quer permitir
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json())
app.use(routes);

app.listen(3333);