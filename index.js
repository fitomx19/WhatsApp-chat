// index.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const MongoDBConnection = require('./MongoDBConnection'); 


const app = express();
const port = process.env.PORT || 3000;


const mongoDBConnection = new MongoDBConnection();
mongoDBConnection.connect();


app.use(bodyParser.json());
app.use('/', routes);
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
