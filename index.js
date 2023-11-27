const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurar las rutas
app.use('/whatsapp', routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
