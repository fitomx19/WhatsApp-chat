const RiveScript = require ('rivescript');
const mongoose = require('mongoose');
const fs = require('fs');
const Mensaje = require('.mensajeModel.js');
 

const handleWebhookGet = (req, res) => {
  const hubVerifyToken = req.query['hub.verify_token'];
  if (hubVerifyToken === 'HolaNovato') {
    console.log('Autenticación correcta.' , req.query['hub.challenge'])
    res.send(req.query['hub.challenge']);
  } else {
    res.status(403).send('Error de autenticación.');
  }
};


const handleWebhookPost = async (req, res) => {
  const data = req.body;
  const telefonoCliente = data.entry[0].changes[0].value.messages[0].from;
  const mensaje = data.entry[0].changes[0].value.messages[0].text.body;
  const idWA = data.entry[0].changes[0].value.messages[0].id;
  const timestamp = data.entry[0].changes[0].value.messages[0].timestamp;

  
  if (data) {
    try {
      const bot = new RiveScript();
      // Cargar el archivo y esperar a que cargue
      await new Promise((resolve, reject) => {
        bot.loadFile("restaurante.rive", resolve, reject);
      });

      bot.sortReplies();
      const username = "local-user";
      const reply = await bot.reply(username, mensaje);
      
      const nuevoMensaje = new Mensaje({
        id: idWA,
        mensaje_recibido: mensaje,
        mensaje_enviado: reply,
        id_wa: idWA,
        telefono_wa: telefonoCliente,
        hora_whatsapp: timestamp
      });

      await nuevoMensaje.save();

      res.status(200).json({ status: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 'error', message: 'Error en el procesamiento del mensaje.' });
    }
  } else {
    res.status(400).json({ status: 'error', message: 'No hay mensaje recibido.' });
  }
};




const handleTextoGet = (req, res) => {
  const texto = fs.readFileSync('texto.txt', 'utf8');

  res.status(200).json({ status: 'success', message: texto });
}

module.exports = {
  handleWebhookGet,
  handleWebhookPost,
  handleTextoGet,
};




/*
id
timestamp
mensaje_recibido
mensaje_enviado
id_wa
timestamp_wa
telefono_wa
*/