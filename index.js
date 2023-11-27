const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar las rutas
app.use('/whatsapp', routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
