// controller.js
const fs = require('fs');

const handleWebhookGet = (req, res) => {
  const hubVerifyToken = req.query['hub.verify_token'];
  if (hubVerifyToken === 'HolaNovato') {
    console.log('Autenticación correcta.' , req.query['hub.challenge'])
    res.send(req.query['hub.challenge']);
  } else {
    res.status(403).send('Error de autenticación.');
  }
};

const handleWebhookPost = (req, res) => {
  const data = req.body;

  const telefonoCliente = data.entry[0].changes[0].value.messages[0].from;
  const mensaje = data.entry[0].changes[0].value.messages[0].text.body;
  const idWA = data.entry[0].changes[0].value.messages[0].id;
  const timestamp = data.entry[0].changes[0].value.messages[0].timestamp;

  if (mensaje) {
    // Puedes ajustar la lógica de escritura en un archivo según tus necesidades
    fs.writeFileSync('texto.txt', mensaje);

    console.log(`Número de teléfono: ${telefonoCliente}`);
    console.log(`Mensaje: ${mensaje}`);
    console.log(`ID de WhatsApp: ${idWA}`);
    console.log(`Timestamp: ${timestamp}`);

    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'error', message: 'No hay mensaje recibido.' });
  }
};

module.exports = {
  handleWebhookGet,
  handleWebhookPost,
};
